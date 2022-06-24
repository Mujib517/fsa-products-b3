const express = require('express');
const productCtrl = require('../controllers/productsCtrl');
const router = express.Router();

// http://localhost:3000/api/products/
router.get('/', productCtrl.get);
router.get('/page/:page/size/:size', productCtrl.get);

router.post('/', productCtrl.post);
// http://localhost:3000/api/products/akdfjdk123434
router.get('/:id', productCtrl.getById);

router.delete('/:id', productCtrl.remove);
router.put('/:id', productCtrl.update);
router.patch('/:id', productCtrl.patch);
// DELETE http://localhost:3000/api/products/:id

module.exports = router;