"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const bookmarks_controller_1 = require("../controllers/bookmarks.controller");
const router = express_1.Router();
router.get('/bookmarks', bookmarks_controller_1.getBookmarks);
router.post('/bookmarks', bookmarks_controller_1.createBookmark);
router.put('/bookmarks/:bookmarkId', bookmarks_controller_1.updateBookmark);
router.delete('/bookmarks/:bookmarkId', bookmarks_controller_1.deleteBookmark);
exports.default = router;
