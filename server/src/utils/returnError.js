module.exports = (field, error) => {
  return {
    error: {
      field,
      message: error,
    },
  };
};
