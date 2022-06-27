const express = require('express');
const productCtrl = require('../controllers/productsCtrl');
const auth = require('../utils/auth');
const router = express.Router();

// http://localhost:3000/api/products/
router.get('/', productCtrl.get);
router.get('/page/:page/size/:size', productCtrl.get);

router.post('/', productCtrl.post);
// http://localhost:3000/api/products/akdfjdk123434
router.get('/:id', productCtrl.getById);

// index.js -> authenticated -> authorizes -> ctrl -> repo
router.delete('/:id', auth.authorizeAdmmin, productCtrl.remove);
router.put('/:id', auth.authorizeAdmmin, productCtrl.update);
router.patch('/:id', productCtrl.patch);
// DELETE http://localhost:3000/api/products/:id

module.exports = router;