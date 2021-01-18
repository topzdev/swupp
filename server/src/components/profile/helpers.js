exports.parsePosts = (posts) => {
  let temp = JSON.parse(JSON.stringify(posts));

  temp = temp.map((item) => {
    const coverPhoto = item.photos[0];
    const views = item.views;
    const likes = parseInt(item.likes);
    delete item.photos;
    delete item.views;
    delete item.likes;

    return {
      ...item,
      price: item.isPriceHidden ? "$$$" : 0,
      coverPhoto,
      counts: { comments: 0, views, likes },
    };
  });

  return temp;
};
