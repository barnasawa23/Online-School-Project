const express = require('express');
const { addComment, getComments, addLike, removeLike, countLikes } = require('../controllers/commentLikeController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/comment', protect, addComment);
router.get('/comments/:schoolId', protect, getComments);
router.post('/like', protect, addLike);
router.post('/unlike', protect, removeLike);
router.get('/likes/:schoolId', protect, countLikes);

module.exports = router;
