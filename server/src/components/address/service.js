const AddressModel = require("./models/Address");
const returnError = require("../../utils/returnError");
const addressHelpers = require("./helpers");
const Address = require("./models/Address");
exports.changeAddress = async ({ id, permanentAddress, presentAddress }) => {
  if (permanentAddress) {
    const id = permanentAddress.id;
    const adddress = await addressHelpers.upsert(permanentAddress, { id });
  }

  if (presentAddress) {
    const id = presentAddress.id;
  }

  return {
    data: {
      id,
    },
  };
};

exports.createBlank = async (userId) => {};
