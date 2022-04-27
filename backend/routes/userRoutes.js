const express = require('express');
const router = express.Router();

// import the handling functions from the controller:
const { registerUser, loginUser, getMe } = require('../controllers/userController');

// import the auth middleware to protect private routes:
const {protect} = require('../middleware/authMiddleware');

router.post('/', registerUser);

router.post('/login', loginUser);

router.get('/me', protect, getMe);

module.exports = router;