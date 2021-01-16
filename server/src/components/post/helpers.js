exports.primitiveData = (body) => {
  let post = {};
  for (let properties in body) {
    console.log(properties);
    if (
      !properties.startsWith("postLocation.") &&
      !properties.startsWith("photos.") &&
      !properties.startsWith("newPhotos.") &&
      !properties.startsWith("updatedPhotos.")
    ) {
      if (properties === "price") {
        post[properties] = parseFloat(body[properties]);
      } else if (properties === "isPriceHidden" || properties === "isDraft") {
        post[properties] = body[properties] === "true";
      } else {
        post[properties] = body[properties];
      }
    } else if (properties.startsWith("postLocation.")) {
      post.postLocation = {};
      post.postLocation.lng = parseFloat(body["postLocation.lng"]);
      post.postLocation.lat = parseFloat(body["postLocation.lat"]);
      post.postLocation.name = body["postLocation.name"];
    }
  }

  return post;
};

exports.parsePostData = (files, body) => {
  let photos = [];
  let length = Object.keys(files).length;

  for (let i = 0; i < length; i++) {
    photos.push({
      photo: files[`photos.photo${i}`],
      caption: body[`photos.caption${i}`],
      isCover: body[`photos.isCover${i}`] === "true",
    });
  }
  let post = this.primitiveData(body);

  post.photos = photos;

  return post;
};

exports.parsePostUpdate = (files, body) => {
  let newPhotos = [],
    npCount = parseInt(body["npCount"]),
    updatedPhotos = [],
    upCount = parseInt(body["upCount"]);

  for (let i = 0; i < npCount; i++) {
    newPhotos.push({
      photo: files[`newPhotos.photo${i}`],
      caption: body[`newPhotos.caption${i}`],
      isCover: body[`newPhotos.isCover${i}`] === "true",
    });
  }

  for (let i = 0; i < upCount; i++) {
    updatedPhotos.push({
      id: parseInt(body[`updatedPhotos.id${i}`]),
      caption: body[`updatedPhotos.caption${i}`],
      isCover: body[`updatedPhotos.isCover${i}`] === "true",
    });
  }

  let post = this.primitiveData(body);

  post.newPhotos = newPhotos;
  post.updatedPhotos = updatedPhotos;
  delete post.npCount;
  delete post.upCount;
  return post;
};

exports.collectPhotoIds = (postPhotos) => {
  return postPhotos.map((item) => {
    const { id, publicId } = item.dataValues;
    return { id, publicId };
  });
};
