const router = require('express').Router();
const productsController = require('../controllers/productsController');
const checkDataProduct = require('../middlewares/checkDataProduct');

router.get('/products', productsController.getAllProducts);

router.get('/products/:id', productsController.getProductId);

router.post('/products', checkDataProduct, productsController.postProducts);

module.exports = router;