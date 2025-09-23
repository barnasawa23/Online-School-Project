const db = require('../db');

class Comment {
    static async addComment(schoolId, userId, text) {
        const result = await db.query(
            'INSERT INTO comments (school_id, user_id, text) VALUES (?, ?, ?)',
            [schoolId, userId, text]
        );
        return result[0];
    }

    static async getCommentsBySchool(schoolId) {
        const [rows] = await db.query(
            'SELECT c.*, u.username FROM comments c JOIN users u ON c.user_id = u.id WHERE c.school_id = ?',
            [schoolId]
        );
        return rows;
    }
}

class Like {
    static async addLike(schoolId, userId) {
        const result = await db.query(
            'INSERT INTO likes (school_id, user_id) VALUES (?, ?)',
            [schoolId, userId]
        );
        return result[0];
    }

    static async removeLike(schoolId, userId) {
        const result = await db.query(
            'DELETE FROM likes WHERE school_id = ? AND user_id = ?',
            [schoolId, userId]
        );
        return result[0];
    }

    static async countLikes(schoolId) {
        const [rows] = await db.query(
            'SELECT COUNT(*) as likeCount FROM likes WHERE school_id = ?',
            [schoolId]
        );
        return rows[0].likeCount;
    }

    static async hasLiked(schoolId, userId) {
        const [rows] = await db.query(
            'SELECT * FROM likes WHERE school_id = ? AND user_id = ?',
            [schoolId, userId]
        );
        return rows.length > 0;
    }
}

module.exports = { Comment, Like };