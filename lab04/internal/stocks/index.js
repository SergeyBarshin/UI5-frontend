const express = require('express');
const { StocksController } = require('./StocksController');

const router = express.Router();

router.get('/categories', StocksController.getCategories);
// Получение акций по конкретному полю (например, `?field=category&val=tech`)
router.get('/search', StocksController.findStockByField); // твое поле,
// Получение акций включению в конкретное поле по конкретному полю (например, `?field=category&val=tech`)
router.get('/searchLike', StocksController.findStockByFieldLike); // твое поле, 
router.get('/', StocksController.findStocks);
router.get('/:id', StocksController.findStockById);
router.post('/', StocksController.addStock);
router.delete('/:id', StocksController.deleteStock);

module.exports = router;