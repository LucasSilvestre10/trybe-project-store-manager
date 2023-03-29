const router = require('express').Router();
const salesController = require('../controllers/salesController');

router.post('/sales', salesController.postSales);
router.get('/sales', salesController.getAllSales);
router.get('/sales/:id', salesController.getSaleId);
router.delete('/sales/:id', salesController.deleteSaleId);
router.put('/sales/:id', salesController.putSaleId);

module.exports = router;