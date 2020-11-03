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
