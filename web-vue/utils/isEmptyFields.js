export default fieldsArray => {
  let check = false;
  fieldsArray.forEach(item => {
    if (item === null || item === "" || item === undefined) check = true;
  });

  return check;
};
