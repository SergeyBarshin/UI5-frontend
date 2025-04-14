class StockUrls {
    constructor() {
        this.baseUrl = 'http://localhost:8000/stocks';
    }

    // GET /stocks/categories - Получение списка всех категорий
    getCategories() {
        return `${this.baseUrl}/categories`;
    }

    // GET /stocks - Получение всех товаров (акций)
    getAllStocks() {
        return `${this.baseUrl}/`;
    }

    // GET /stocks/:id - Получение конкретного товара по его ID
    getStockById(id) {
        return `${this.baseUrl}/${id}`;
    }

    // GET /stocks/search?field=<field>&val=<value> - Поиск с точным совпадением
    searchByFieldExact(field, value) {
        return `${this.baseUrl}/search?field=${encodeURIComponent(field)}&val=${encodeURIComponent(value)}`;
    }

    // GET /stocks/searchLike?field=<field>&val=<value> - Поиск по подстроке (like)
    searchByFieldLike(field, value) {
        return `${this.baseUrl}/searchLike?field=${encodeURIComponent(field)}&val=${encodeURIComponent(value)}`;
    }

    // POST /stocks - Добавление нового товара
    addStock() {
        return `${this.baseUrl}/`;
    }

    // DELETE /stocks/:id - Удаление товара по ID
    deleteStockById(id) {
        return `${this.baseUrl}/${id}`;
    }

}

export const stockUrls = new StockUrls();