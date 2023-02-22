const { Notices } = require("../models/notice");
const { User } = require("../models/user");

const createNotice = async (
  { category, title, name, birthday, breed, gender, location, price, comments, image },
  owner
) => {
  return await Notices.create({
    category,
    title,
    name,
    birthday,
    breed,
    gender,
    location,
    price,
    comments,
    image,
    owner,
  });
};

const getNoticeById = async id => {
  return await Notices.findById(id);
};

const getNoticesByCategory = async category => {
  return await Notices.find({ category });
};

const getFavoriteNotices = async _id => {
  const user = await User.findById(_id).populate("favorites").select("favorites");
  return user.favorites;
};

const addNoticeInFavorites = async (noticeId, _id) => {
  return await User.findByIdAndUpdate(_id, { $push: { favorites: noticeId } }, { new: true });
};

const deleteNoticeFromFavorites = async (noticeId, _id) => {
  return await User.findByIdAndUpdate(
    _id,
    { $pull: { favorites: { $in: [noticeId] } } },
    { new: true }
  );
};

const getMyNotices = async owner => {
  return await Notices.find({ owner });
};

const deleteMyNotice = async (noticeId, owner) => {
  return await Notices.findOneAndDelete({ _id: noticeId, owner });
};

module.exports = {
  createNotice,
  getNoticeById,
  getNoticesByCategory,
  getFavoriteNotices,
  addNoticeInFavorites,
  deleteNoticeFromFavorites,
  getMyNotices,
  deleteMyNotice,
};
