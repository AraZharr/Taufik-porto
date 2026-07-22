const express = require('express');
const router = express.Router();
const { login, logout, checkAuth } = require('../controllers/authController');
const auth = require('../middleware/auth');

router.post('/login', login);
router.post('/logout', auth, logout);
router.get('/check', checkAuth);

module.exports = router;
