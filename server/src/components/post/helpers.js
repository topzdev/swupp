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
  const post = {};

  for (let properties in body) {
    console.log(properties);
    if (!properties.startsWith("photos.")) {
      if (properties === "price") {
        post[properties] = parseFloat(body[properties]);
      } else if (properties === "isPriceHidden" || properties === "isDraft") {
        post[properties] = body[properties] === "true";
      } else {
        post[properties] = body[properties];
      }
    }
  }

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

  const post = {};

  for (let properties in body) {
    if (
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
    }
  }

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
