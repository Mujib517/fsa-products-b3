const express = require('express');
const reviewCtrl = require('../controllers/reviewCtrl');
const router = express.Router();

router.post('/', reviewCtrl.post);

module.exports = router;