const AddressModel = require("./models/Address");

exports.upsert = async (values, condition) => {
  return AddressModel.findOne({ where: condition }).then(function (obj) {
    // update
    if (obj) return obj.update(values);
    // insert
    return Model.create(values);
  });
};
