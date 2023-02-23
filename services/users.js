const { User } = require("../models/user");
const { Pets } = require("../models/pet");

const getUserByEmail = async email => {
  return await User.findOne({ email });
};

const createUser = async fields => {
  return await User.create(fields);
};

const updateUser = async (userId, fields) => {
  return await User.findOneAndUpdate({ _id: userId }, fields, {
    new: true,
    runValidators: true,
  });
};

const getUserByVerificationToken = async verificationToken => {
  return await User.findOne({ verificationToken });
};

const getCurrentUserInfo = async id => {
  return await User.findById(id);
};

module.exports = {
  getUserByEmail,
  createUser,
  updateUser,
  getUserByVerificationToken,
  getCurrentUserInfo,
};
