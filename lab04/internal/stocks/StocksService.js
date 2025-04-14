const { StockDAO } = require('./StocksDAO')

class StocksService {
    static findStocks(id) {
        if (id !== undefined) {
            return StockDAO.findById(id).toJSON()
        }

        return StockDAO.find().map((stock) => stock.toJSON())
    }

    static findStocksByField(field, val) {
        if (field !== undefined && val !== undefined) {
            return StockDAO.findByField(field, val).map(stock => stock.toJSON())
        }

        return StockDAO.read().map(stock => stock.toJSON())
    }

    static findStockByFieldLike(field, val) {
        if (field !== undefined && val !== undefined) {
            return StockDAO.findByFieldLike(field, val).map(stock => stock.toJSON())
        }

        return StockDAO.read().map(stock => stock.toJSON());
    }

    static getAllCategories() {
        return StockDAO.getAllCategories(); // Вызов метода из StocksDAO
    }

    static addStock(stock) {
        return StockDAO.insert(stock).toJSON()
    }

    static deleteStock(id) {
        return StockDAO.delete(id).map((stock) => stock.toJSON())
    }
}

module.exports = {
    StocksService,
}