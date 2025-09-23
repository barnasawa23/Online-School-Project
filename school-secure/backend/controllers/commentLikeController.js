const { Comment, Like } = require('../models/commentLikeModel');

const addComment = async (req, res) => {
    try {
        const { schoolId, text } = req.body;
        const userId = req.user.id;
        const result = await Comment.addComment(schoolId, userId, text);
        res.status(200).json({ message: 'Comment added', id: result.insertId });
    } catch (error) {
        res.status(500).json({ message: 'Error adding comment', error: error.message });
    }
};

const getComments = async (req, res) => {
    try {
        const schoolId = req.params.schoolId;
        const comments = await Comment.getCommentsBySchool(schoolId);
        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({ message: 'Error getting comments', error: error.message });
    }
};

const addLike = async (req, res) => {
    try {
        const { schoolId } = req.body;
        const userId = req.user.id;
        await Like.addLike(schoolId, userId);
        res.status(200).json({ message: 'Liked' });
    } catch (error) {
        res.status(500).json({ message: 'Error liking', error: error.message });
    }
};

const removeLike = async (req, res) => {
    try {
        const { schoolId } = req.body;
        const userId = req.user.id;
        await Like.removeLike(schoolId, userId);
        res.status(200).json({ message: 'Unliked' });
    } catch (error) {
        res.status(500).json({ message: 'Error unliking', error: error.message });
    }
};

const countLikes = async (req, res) => {
    try {
        const schoolId = req.params.schoolId;
        const likeCount = await Like.countLikes(schoolId);
        res.status(200).json({ likeCount });
    } catch (error) {
        res.status(500).json({ message: 'Error counting likes', error: error.message });
    }
};

module.exports = { addComment, getComments, addLike, removeLike, countLikes };