const router = require('express').Router();
const productsController = require('../controllers/productsController');
const checkDataProduct = require('../middlewares/checkDataProduct');

router.get('/products', productsController.getAllProducts);

router.get('/products/:id', productsController.getProductId);

router.post('/products', checkDataProduct, productsController.postProducts);

router.put('/products/:id', checkDataProduct, productsController.putProducts);

router.delete('/products/:id', productsController.deleteProducts);

module.exports = router;