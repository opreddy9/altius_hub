const express = require('express');
const { updateProfile } = require('../controllers/userController');
const { User, validateUser } = require('../models/user');
const upload = require('../middleware/uploadMiddleware');
const router = express.Router();

// Route to update user profile
router.put('/profile', upload.single('profilePicture'), updateProfile);

module.exports = router;
