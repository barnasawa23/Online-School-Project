const School = require('../models/schoolModel');
const getAllSchools = async (req, res) => {
    try {
        const schools = await School.getAllSchools();
        res.status(200).json(schools);
    }catch (error) {
        res.status(500).json({ message: 'Error getting school'});
    }
};
const addSchool = async (req, res) => {
    try{
        const { name, phone } = req.body;
        const image = req.file ? req.file.filename : null;
        const result = await School.addSchool(name, phone, image);
        res.status(200).json({ message: 'School added successfully', id: result.insertId });
    }catch (error) {
        res.status(500).json({ message: 'Error adding school', error: error.message });
    }
};

const deleteSchool = async (req, res) => {
    try {
        const id = req.params.id;
        const result = await School.deleteSchool(id);
        res.status(200).json({ message: 'School deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting school', error: error.message });
    }
}

const updateSchool = async(req, res) => {
    try {
        const id = req.params.id;
        const { name, phone } = req.body;
        // const image = req.file ? req.file.filename : null;
        if(!name || !phone) {  
            return res.status(500).json({ message: 'Please provide name and phone' });
        }

        // Get existing image from DB if no new image uploaded
        let image = req.file ? req.file.filename : null;

        // If no new image is uploaded, get the existing image from DB
        if (!image) {
            const existingSchool = await School.getSchoolById(id);
            if (!existingSchool) {
                return res.status(404).json({ message: 'School not found' });
            }
            image = existingSchool.image;
        }

        const result = await School.updateSchool(id, name, phone, image);
        res.status(200).json({ message: 'School updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error updating school', error: error.message });
    }
}

const uploadImage = async (req, res) => {
    try {
        const id = req.params.id;
        const image = req.file ? req.file.filename : null;
        if(!image) {
            return res.status(500).json({ message: 'Please provide image' });
        }

        const result = await School.uploadImage(id, image);
        res.status(200).json({ message: 'Image uploaded successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error uploading image', error: error.message });
    }
}

const getSchoolById = async (req, res) => {
    try {
        const id = req.params.id;
        const school = await School.getSchoolById(id);
        if (!school) {
            return res.status(404).json({ message: 'School not found' });
        }
        res.status(200).json(school);
    } catch (error) {
        res.status(500).json({ message: 'Error getting school', error: error.message });
    }
}

module.exports = {
    getAllSchools,
    addSchool,
    deleteSchool,
    updateSchool,
    uploadImage,
    getSchoolById
}