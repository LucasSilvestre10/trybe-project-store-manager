const router = require('express').Router();
const salesController = require('../controllers/salesController');

router.post('/sales', salesController.postSales);
router.get('/sales', salesController.getAllSales);
router.get('/sales/:id', salesController.getSaleId);

module.exports = router;