const router = require('express').Router();
const salesController = require('../controllers/salesController');

router.post('/sales', salesController.postSales);

module.exports = router;