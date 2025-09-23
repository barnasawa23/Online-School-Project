const express = require('express');
const schoolController = require('../controllers/schoolController');
const upload = require('../middleware/uploads');

const router = express.Router();

router.get('/allSchool', schoolController.getAllSchools);
router.post('/addSchool', upload.single('image'), schoolController.addSchool);
router.delete('/deleteSchool/:id', schoolController.deleteSchool);
router.put('/updateSchool/:id', upload.single('image'), schoolController.updateSchool);
router.put('/uploadImage/:id', upload.single('image'), schoolController.uploadImage);
router.get('/getSchool/:id', schoolController.getSchoolById);

module.exports = router;