const express = require('express');
const userCtrl = require('../controllers/userCtrl');
const router = express.Router();

router.post('/register', userCtrl.post);

module.exports = router;