const { Notice } = require("../models/notice");

const getNotices = category => {
  const filters = { category };

  return Notice.find(filters, "_id title breed location age category");
};
module.exports = {
  getNotices,
};
