const { NotFound } = require("http-errors");
const { Notice } = require("../models/notice");
const { User } = require("../models/user");
const service = require("../service/notices");

async function getNoticesByCategory(req, res, next) {
  const { category } = req.query;

  try {
    const noticesBycategory = await service.getNotices(category);

    res.json(noticesBycategory);
  } catch (error) {
    next(error);
  }
}

async function getNoticeById(req, res) {
  const { noticeId } = req.params;

  const notice = await Notice.findById(noticeId);

  if (!notice) {
    throw NotFound(404);
  }

  return res.json(notice);
}

async function addNoticeInFavorites(req, res) {
  const { noticeId } = req.params;
  const { user } = req;

  console.log(noticeId);

  console.log(user);

  const result = await Notice.findOneAndUpdate(
    { owner: user._id, _id: noticeId },
    { favorite: true },
    { new: true }
  );

  console.log(result);

  
  if (!result) {
    throw NotFound(404);
  }
  res.json({
    user: { email: user.email, favorite: user.favorite },
  });
}

async function getFavoritesNotices(req, res) {
  const unsortedNotices = await User.find({ _id: req.user._id });

  console.log(unsortedNotices);
  if (!unsortedNotices) {
    throw HttpError(404);
  }

  res.json({ unsortedNotices });
}

module.exports = {
  getNoticesByCategory,
  getNoticeById,
  addNoticeInFavorites,
  getFavoritesNotices,
};
