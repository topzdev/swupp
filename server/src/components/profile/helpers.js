exports.parsePosts = (posts) => {
  let temp = JSON.parse(JSON.stringify(posts));

  temp = temp.map((item) => {
    const coverPhoto = item.photos[0];
    delete item.photos;

    return {
      ...item,
      price: item.isPriceHidden ? "$$$" : 0,
      coverPhoto,
      counts: { comments: 0, views: 0 },
    };
  });

  return temp;
};
