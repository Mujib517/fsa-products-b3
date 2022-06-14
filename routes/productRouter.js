const express = require('express');
const productCtrl = require('../controllers/productsCtrl');
const router = express.Router();

// http://localhost:3000/api/products/
router.get('/', productCtrl.get);

module.exports = router;