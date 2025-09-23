const express = require('express');
const schoolController = require('../controllers/schoolController');
const upload = require('../middleware/uploads');
const { protect } = require('../middleware/authMiddleware');
const {login, register} = require('../controllers/authController');


const router = express.Router();

router.get('/allSchool', protect, schoolController.getAllSchools);
router.post('/addSchool', protect, upload.single('image'), schoolController.addSchool);
router.delete('/deleteSchool/:id', protect, schoolController.deleteSchool);
router.put('/updateSchool/:id', protect, upload.single('image'), schoolController.updateSchool);
router.put('/uploadImage/:id', protect, upload.single('image'), schoolController.uploadImage);
router.get('/getSchool/:id', protect, schoolController.getSchoolById);
router.post('/register', register);
router.post('/login', login);

module.exports = router;