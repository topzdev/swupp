const UserModel = require("../user/models/User");
const { Op } = require("sequelize");

exports.checkUsernameExist = async (usernameOrEmail) => {
  const user = await UserModel.findOne({
    where: {
      [Op.or]: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
    },
  });
  return user ? true : false;
};
