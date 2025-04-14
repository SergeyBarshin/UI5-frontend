const { StocksRepository } = require('./StocksRespository')

class StockDAO {
    constructor(id, category, src, title, text) {
        this.id = id
        this.category = category
        this.src = src
        this.title = title
        this.text = text
    }

    static _validateId(id) {
        const numberId = Number.parseInt(id)
        if (Number.isNaN(numberId)) {
            throw new Error('invalidate id')
        }
    }

    static _validate(stock) {
        if (
            stock.id === undefined ||
            stock.src === undefined ||
            stock.title === undefined ||
            stock.text === undefined ||
            stock.category === undefined
        ) {
            throw new Error('invalidate stock data')
        }

        this._validateId(stock.id)
    }

    static find() {
        const stocks = StocksRepository.read()

        return stocks.map(({ id, category, src, title, text }) => {
            return new this(id, category, src, title, text)
        })
    }

    static findById(id) {
        this._validateId(id)

        const stocks = StocksRepository.read()
        const stock = stocks.find((s) => s.id === id)

        return new this(stock.id, stock.category, stock.src, stock.title, stock.text)
    }

    static findByField(field, val) {
        const stocks = StocksRepository.read()
        const filteredStocks = stocks.filter((s) => s[field] == val)

        return filteredStocks.map(stock => new this(stock.id, stock.category, stock.src, stock.title, stock.text))
    }

    static findByFieldLike(field, val) {
        const stocks = StocksRepository.read()
        const filteredStocks = stocks.filter((s) => s[field]?.toLowerCase().includes(val.toLowerCase()))
        return filteredStocks.map(stock => new this(stock.id, stock.category, stock.src, stock.title, stock.text))
    }

    static getAllCategories() {
        const stocks = StocksRepository.read()
        const categories = stocks.map(stock => stock.category)
        const uniqueCategories = [...new Set(categories)] // убираем дубликаты
        return uniqueCategories
    }

    static insert(stock) {
        this._validate(stock)

        const stocks = StocksRepository.read()
        StocksRepository.write([...stocks, stock])

        return new this(stock.id, stock.category, stock.src, stock.title, stock.text)
    }

    static delete(id) {
        this._validateId(id)

        const stocks = StocksRepository.read()
        const filteredStocks = stocks.filter((s) => s.id !== id)

        StocksRepository.write(filteredStocks)

        return filteredStocks.map(({ id, src, title, text }) => {
            return new this(id, category, src, title, text)
        })
    }

    toJSON() {
        return {
            id: this.id,
            category: this.category,
            src: this.src,
            title: this.title,
            text: this.text,
        }
    }
}

module.exports = {
    StockDAO,
}