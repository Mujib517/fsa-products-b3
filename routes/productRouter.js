const express = require('express');
const multer = require('multer');
const productCtrl = require('../controllers/productsCtrl');
const auth = require('../utils/auth');
const upload = require('../utils/uploader');

const router = express.Router();

// http://localhost:3000/api/products/
router.get('/', productCtrl.get);
router.get('/page/:page/size/:size', productCtrl.get);

router.post('/', upload.single('img'), productCtrl.post);
// http://localhost:3000/api/products/akdfjdk123434
router.get('/:id', productCtrl.getById);

// index.js -> authenticated -> authorizes -> ctrl -> repo
router.delete('/:id', productCtrl.remove);
router.put('/:id', productCtrl.update);
router.patch('/:id', productCtrl.patch);
// DELETE http://localhost:3000/api/products/:id

module.exports = router;