const { Notice } = require("../models/notice");

async function getNotices(req, res) {
  const { category } = req.query;
  const allNotices = await Notice.find({ category });
  return res.json(allNotices);
}

async function getNotice(req, res, next) {
  const { noticeId } = req.params;

  const notice = await Notice.findById(noticeId);

  if (!notice) {
    console.log("Error");
  }

  return res.json(notice);
}

module.exports = {
  getNotices,
  getNotice,
};
