exports.parsePosts = (posts) => {
  let temp = JSON.parse(JSON.stringify(posts));

  temp = temp.map((item) => {
    const coverPhoto = item.photos[0];
    const views = item.views;
    const likes = parseInt(item.likes);
    const offers = parseInt(item.offers);
    delete item.photos;
    delete item.views;
    delete item.likes;
    delete item.offers;

    return {
      ...item,
      coverPhoto,
      counts: { comments: 0, views, likes, offers },
    };
  });

  return temp;
};
