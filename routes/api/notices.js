const express = require("express");

const { auth } = require("../../middlewares/auth");
const tryCatchWrapper = require("../../helpers/tryCatchWrapper");

const {
  getNoticesByCategory,
  getNoticeById,
  addNoticeInFavorites,
  getFavoritesNotices,
} = require("../../controllers/notices.controller");

const noticesRouter = express.Router();

noticesRouter.get("/", getNoticesByCategory);
noticesRouter.get("/:noticeId", getNoticeById);
noticesRouter.patch("/:noticeId", auth, tryCatchWrapper(addNoticeInFavorites));
noticesRouter.get("/favorites", auth, tryCatchWrapper(getFavoritesNotices));
module.exports = noticesRouter;
