const express = require('express');
const router = express.Router();
const { get, update } = require('../controllers/contactController');
const auth = require('../middleware/auth');

router.get('/', get);
router.put('/', auth, update);

module.exports = router;
