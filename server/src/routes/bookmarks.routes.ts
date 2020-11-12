import { Router } from 'express';
import { getBookmarks, createBookmark, updateBookmark, deleteBookmark }  from '../controllers/bookmarks.controller';
const router = Router();

router.get('/bookmarks', getBookmarks);
router.post('/bookmarks', createBookmark);
router.put('/bookmarks/:bookmarkId', updateBookmark);
router.delete('/bookmarks/:bookmarkId', deleteBookmark);

export default router;