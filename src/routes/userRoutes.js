const express = require('express');
const {getUserProfile, getUserList } = require('../controllers/userController');
const {verifyToken} = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/profile', verifyToken, getUserProfile);
router.get('/list', verifyToken, getUserList);

module.exports = router;