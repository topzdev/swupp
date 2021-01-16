const PostModel = require("./models/Post");
const PostPhotoModel = require("./models/PostPhoto");
const PostLocationModel = require("./models/PostLocation");
const PostLikesModel = require("./models/PostLikes");
const PostSaveModel = require("./models/PostSaves");
const UserModel = require("../user/models/User");
const ProfileModel = require("../profile/models/Profile");
const photoServices = require("../photo/services");
const sequelize = require("../../config/sequelize");
const photoHelpers = require("../photo/helpers");
const postHelpers = require("./helpers");
const PostPhoto = require("./models/PostPhoto");
const { updatePost } = require("./controller");
const { update } = require("./models/Post");
const profileHelpers = require("../profile/helpers");
const Op = require("sequelize").Op;
const ProfilePhotoModel = require("../profile/models/ProfilePhoto");

exports.createPost = async ({
  title,
  price,
  body,
  isPriceHidden,
  categoryId,
  conditionId,
  postLocation,
  prefered,
  userId,
  isDraft,
  photos,
}) => {
  // instantiated transaction for safe db saving
  const t = await sequelize.transaction();
  // where the photoIds like publicId and db id where stored after saving it to databse for error handiling
  let photoIds = null;
  console.log("User id", userId);
  try {
    // insert post to database
    console.log("Creating post...");
    const post = await PostModel.create(
      {
        title,
        price,
        body,
        isPriceHidden,
        categoryId,
        conditionId,
        prefered,
        userId,
        isDraft,
        postLocation,
      },

      {
        transaction: t,
        include: { model: PostLocationModel, as: "postLocation" },
      }
    );
    console.log("Post Created", post);

    // uploading photos to cloudinary
    const uploadedPhoto = await photoServices.uploadPostPhotos(post.id, photos);

    // upload photo to image storage
    console.log("Uploading post photo...");
    const postPhotos = await PostPhotoModel.bulkCreate(uploadedPhoto, {
      transaction: t,
    });

    console.log("Collecting photoIds...");
    photoIds = postHelpers.collectPhotoIds(postPhotos);

    console.log("Committing changes...");
    // committing all database transations
    await t.commit();

    // return id and success message to frontendt
    return {
      data: {
        id: post.id,
        photos: photoIds,
      },
      message: "Post successfully added",
    };
  } catch (error) {
    console.log(error);
    // if there is a error happend then rollback all database transaction
    console.log("Rollback is happening...");
    await t.rollback();

    // delete photos on cloudinary when database error happened
    console.log("Deleting photos that uploaded to cloudinary...");
    if (!photoIds && !photoIds.length) {
      photoHelpers.bulkDeleteToCloud(photoIds.map((item) => item.publicId));
    }
    throw { error: "Something wrong with server" };
  }
};

exports.getCurrentUserPosts = async ({ userId }) => {
  const posts = await PostModel.findAll({ where: { userId } });
  return { data: { posts }, message: "Fetch all current post" };
};

exports.getPreviewPostById = async (id) => {
  console.log("Preview Post");
  await this.viewed({ id });
  let post = await PostModel.findByPk(id, {
    include: [
      {
        model: PostLocationModel,
        as: "postLocation",
        attributes: ["lat", "lng", "name"],
      },
      {
        model: UserModel,
        as: "user",
        attributes: ["username", "id"],
        include: [
          {
            model: ProfileModel,
            attributes: ["firstname", "lastname"],
            include: [
              {
                model: ProfilePhotoModel,
                as: "profilePhoto",
                attributes: ["publicId", "url", "securedUrl", "id"],
              },
            ],
          },
        ],
      },

      {
        model: PostPhotoModel,
        as: "photos",
      },
    ],
  });

  let plainPost = post.get({ plain: true });

  let count = {
    views: plainPost.views,
  };

  delete plainPost.views;

  plainPost.count = count;

  return {
    data: {
      post: plainPost,
    },
    message: "Fetch Preview Post",
  };
};

exports.getPostById = async ({ id, userId }) => {
  const post = await PostModel.findOne({
    where: { id, userId },
    include: [
      { model: UserModel, attributes: ["username"], as: "user" },
      {
        model: PostLocationModel,
        attributes: ["lat", "lng", "name", "id"],
      },
      {
        model: PostPhoto,
        attributes: [
          "id",
          "url",
          "securedUrl",
          "caption",
          "isCover",
          "publicId",
        ],
        as: "photos",
      },
    ],
  });

  let plainPost = post.get({ plain: true });

  if (!plainPost.postLocation)
    plainPost.postLocation = {
      name: "",
      lat: 0,
      lng: 0,
    };

  return { data: plainPost, message: "Post by id fetched" };
};

exports.getPostsCount = async () => {
  return await PostModel.count();
};

exports.getPosts = async ({
  order = "DESC",
  limit = 25,
  page = 1,
  category,
  condition,
  search,
}) => {
  let where = {};
  if (category) where.categoryId = category;
  if (condition) where.conditionId = condition;
  if (search) {
    where.title = {
      [Op.iLike]: `%${search}%`,
    };
    where.isDraft = false;
  }

  const options = {
    attributes: {
      exclude: ["updatedAt", "deletedAt"],
    },
    order: [["createdAt", order]],
    limit,
    offset: (page - 1) * limit,
    where,
  };
  const count = await PostModel.count(options);
  const posts = await PostModel.findAll({
    ...options,
    include: [
      {
        model: UserModel,
        as: "user",
        attributes: ["username", "id"],

        include: [
          {
            model: ProfileModel,
            attributes: ["firstname", "lastname"],
            include: [
              {
                model: ProfilePhotoModel,
                as: "profilePhoto",
                attributes: ["publicId", "url", "securedUrl", "id"],
              },
            ],
          },
        ],
      },
      {
        model: PostPhotoModel,
        as: "photos",
        where: {
          isCover: true,
        },
      },
    ],
  });
  let parsePost = profileHelpers.parsePosts(posts);

  return {
    data: { items: parsePost, count, last: count <= page * limit },
    message: "Fetch all post",
  };
};

exports.updatePost = async ({
  id,
  title,
  price,
  body,
  isPriceHidden,
  categoryId,
  conditionId,
  prefered,
  userId,
  isDraft,
  newPhotos,
  deletedPhotoIds,
  updatedPhotos,
  postLocation,
}) => {
  /*
  1. Update post information
    
  2. Update post photo
    - check photos if there is new uploaded photo
      - validate photos (if null)
      - call uploadPostPhotos method to upload photos
      - collect uploaded photo ids
    - check if there is a deleted photos 
      - validate photos ids (if null)
      - call deletePostPhotos method to delete photos

  3. Return message and data with post id and new photos ids
  */
  const t = await sequelize.transaction();
  let newPhotoIds = null;

  try {
    console.log("Updating existing info...");
    const post = await PostModel.update(
      {
        title,
        price,
        body,
        isPriceHidden,
        categoryId,
        conditionId,
        prefered,
        userId,
        isDraft,
      },

      { where: { id }, transaction: t }
    );

    // if post location is avaialble and has id then update post location model
    if (postLocation.id) {
      console.log("Post location available then updating");
      await PostLocationModel.update(postLocation, {
        where: { id: postLocation.id },
        transaction: t,
      });
    } else {
      // if post location is not available then create post location base on post id
      console.log("No postLocation then creating a new one");
      await PostLocationModel.create(
        { ...postLocation, postId: id },
        { transaction: t }
      );
    }

    if (updatedPhotos && updatedPhotos.length) {
      console.log("Updating exisiting photos");
      let resultUpdate = [];
      updatedPhotos.forEach(async function (item) {
        resultUpdate.push(
          await PostPhotoModel.update(
            { caption: item.caption, isCover: item.isCover },
            { where: { id: item.id }, transaction: t }
          )
        );
      });

      console.log("Updated photos", resultUpdate);
    }
    if (newPhotos && newPhotos.length) {
      // validate photos (if null)
      console.log("Uploading new photos...");
      const uploadedPhoto = await photoServices.uploadPostPhotos(id, newPhotos);
      const postPhotos = await PostPhotoModel.bulkCreate(uploadedPhoto, {
        transaction: t,
      });

      console.log("Collecting photoIds...");
      newPhotoIds = postHelpers.collectPhotoIds(postPhotos);
      console.log("new photos uploaded", newPhotoIds);
    }

    if (deletedPhotoIds && deletedPhotoIds.length) {
      console.log("Deleting photos...");
      const publicIds = deletedPhotoIds;
      console.log("Deleting photos from database...");
      const deletedPhoto = await PostPhotoModel.destroy({
        where: { [Op.and]: { postId: id, publicId: publicIds } },
        transaction: t,
      });
      console.log(deletedPhoto);
      const cloudDelete = await photoServices.deletePostPhotos(publicIds);
      console.log("List of deleted from cloud", cloudDelete);
    }

    await t.commit();

    return {
      data: {
        id: post.id,
        photos: newPhotoIds,
      },
      message: "Post successfully updated",
    };
  } catch (error) {
    console.log(error);
    // if there is a error happend then rollback all database transaction
    console.log("Rollback is happening...");
    await t.rollback();

    // delete photos on cloudinary when database error happened
    console.log("Deleting photos that uploaded to cloudinary...");
    if (!photoIds && !photoIds.length) {
      photoHelpers.bulkDeleteToCloud(photoIds.map((item) => item.publicId));
    }
    throw { error: "Something wrong with server" };
  }

  return true;
};

exports.removePost = async ({ id }) => {
  const t = await sequelize.transaction();

  /* 
  Its not actually deleting it on database i added paranoid 
  option so that when the user remove this post it will only set value for deleteAt
  this way when the user accidetally delete this post he/she can request post recovery 
  to admins
  
  1. Delete post 
  
  NOTE: if paranoid is implemented dont do this!
  2. Delete photos on image cloud server 
    - check if photo successfully deleted. if not then call transaction rollback
  3 Delete photos on database 
  4. return true if success and error if encountered error on deleting
  */

  try {
    // removing post info
    await PostModel.destroy({ where: { id }, transaction: t });

    // removing post photo info...
    await PostPhotoModel.destroy({
      where: { [Op.and]: { postId: id } },
      transaction: t,
    });

    await t.commit();

    return {
      data: true,
      message: "Post successfully deleted",
    };
  } catch (error) {
    console.log(error);
    // if there is a error happend then rollback all database transaction
    console.log("Rollback is happening...");
    await t.rollback();
    throw { error: "Something wrong with server" };
  }
};

exports.viewed = async ({ id }) => {
  await PostModel.update(
    { views: sequelize.literal("views + 1") },
    { where: { id } }
  );
  return {
    message: "Post Viewed",
  };
};

exports.likePost = async ({ postId, userId }) => {};
