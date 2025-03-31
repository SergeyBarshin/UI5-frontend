const { StocksService } = require('./StocksService');

class StocksController {
    static findStocks(req, res) {

        try {
            res.send(StocksService.findStocks());
        } catch (err) {
            res.status(400).send({ status: 'Bad Request', message: err.message })
        }
    }

    static findStockById(req, res) {
        try {
            const id = Number.parseInt(req.params.id);
            res.send(StocksService.findStocks(id))
        } catch (err) {
            res.status(400).send({ status: 'Bad Request', message: err.message })
        }
    }

    static findStockByField(req, res) {
        try {
            let { field, val } = req.query;
            // let field = "category"
            //let val = "Овощи и фрукты"
            if (!field || !val) {
                return res.status(400).json({ status: 'Bad Request', message: err.message });
            }
            console.log(field, val)
            const stocks = StocksService.findStocksByField(field, val);

            if (!stocks.length) {
                return res.status(404).json({ message: "Записи не найдены" });
            }

            res.status(200).json(stocks);
        } catch (error) {
            res.status(500).json({ message: "Ошибка сервера", error: error.message });
        }
    }


    static addStock(req, res) {
        try {
            res.send(StocksService.addStock(req.body));
        } catch (err) {
            res.status(400).send({ status: 'Bad Request', message: err.message })
        }
    }

    static deleteStock(req, res) {
        try {
            const id = Number.parseInt(req.params.id);
            res.send(StocksService.deleteStock(id));
        } catch (err) {
            res.status(400).send({ status: 'Bad Request', message: err.message })
        }
    }

    static getCategories(req, res) {
        try {
            const categories = StocksService.getAllCategories();
            res.status(200).json(categories);
        } catch (error) {
            res.status(500).json({ message: "Ошибка сервера", error: error.message });
        }
    }
}

module.exports = {
    StocksController,
};