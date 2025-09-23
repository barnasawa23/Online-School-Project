const db = require('../db');


class School{
    static async getAllSchools(){
        const [rows] = await db.query('SELECT * FROM schoolInfo');
        return rows;
    }
    static async addSchool(name,phone,image){
        const result = await db.query('INSERT INTO schoolInfo (name, phone, image) VALUES (?, ?, ?)', [name, phone, image]);
        return result[0];
    }

    static async deleteSchool(id){
        const result = await db.query(`DELETE FROM schoolInfo WHERE id = ?`, [id]);
        return result[0];
    }

    static async updateSchool(id, name, phone, image){
        const result = await db.query(`UPDATE schoolInfo SET name = ?, phone = ?, image=? WHERE id = ?`, [name, phone, image, id]);
        return result[0];
    }

    static async uploadImage(id, image){
        const result = await db.query(`UPDATE schoolInfo SET image=? WHERE id = ?`, [image, id]);
        return result[0];
    }

    static async getSchoolById(id){
        const [rows] = await db.query('SELECT * FROM schoolInfo WHERE id = ?', [id]);
        return rows[0];
    }


}


module.exports = School;