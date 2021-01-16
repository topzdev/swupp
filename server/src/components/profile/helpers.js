exports.parsePosts = (posts) => {
  let temp = JSON.parse(JSON.stringify(posts));

  temp = temp.map((item) => {
    const coverPhoto = item.photos[0];
    const views = item.views;
    delete item.photos;
    delete item.views;

    return {
      ...item,
      price: item.isPriceHidden ? "$$$" : 0,
      coverPhoto,
      counts: { comments: 0, views },
    };
  });

  return temp;
};
