const db = require('../db');


class User{
    static async createUser( username, hashedPassword ){
        const result = await db.query('INSERT INTO users (username, password) VALUES(?, ?)', [username, hashedPassword])
        return result;
    }

    static async getUserByName(username) {
    const [rows] = await db.query('SELECT * FROM users WHERE username = ?', [username]);
    return rows[0]; // returns undefined if no user found
}
}


module.exports = User;