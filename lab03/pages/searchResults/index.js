// pages/searchResults/index.js
import { ProductCardComponent } from "../../components/product-card/index.js";
import { ProductPage } from "../product/index.js";
import { stockUrls } from '../../utils/stockUrls.js';
import { makeXhrRequest } from '../../utils/xhrHelper.js';

export class SearchResultsPage {
    constructor(parent, searchTerm) {
        this.parent = parent;
        this.searchTerm = searchTerm; // Термин, который искали
        this.products = []; // Массив для хранения найденных продуктов
    }

    async fetchResults() {
        try {
            const apiUrl = stockUrls.searchByFieldLike('title', this.searchTerm);
            console.log('Fetching search results from:', apiUrl);
            const searchData = await makeXhrRequest('GET', apiUrl);
            this.products = searchData; // Данные уже распарсены
            console.log('Search results received:', this.products);
            return true;
        } catch (error) {
            console.error('Ошибка при поиске товаров:', error.message);
            this.products = [];
            return false;
        }
    }


    // Обработчик клика по карточке товара (такой же, как в CategoryPage)
    handleProductClick(e) {
        // Ищем родительский элемент кнопки с data-id
        const cardButton = e.target.closest('button[data-id]');
        if (cardButton) {
            const cardId = cardButton.dataset.id;
            if (cardId) {
                const productPage = new ProductPage(this.parent, cardId);
                productPage.render();
            } else {
                console.error('Не найден ID в data-атрибуте кнопки');
            }
        }
    }

    // Рендер страницы
    async render() {
        // Очищаем родительский элемент
        this.parent.innerHTML = `
            <div class="container py-4">
                <h2 id="search-results-title">Поиск товаров...</h2>
                <div id="search-results-container"
                    class="d-flex flex-row flex-wrap justify-content-center gap-3 mt-4">
                    <div class="spinner-border text-primary my-5" role="status">
                        <span class="visually-hidden">Загрузка...</span>
                    </div>
                </div>
            </div>
        `;

        const resultsContainer = document.getElementById('search-results-container');
        const resultsTitle = document.getElementById('search-results-title');

        const success = await this.fetchResults();

        resultsTitle.textContent = `Результаты поиска по запросу: "${this.searchTerm}"`;

        resultsContainer.innerHTML = '';

        if (!success) {
            resultsContainer.innerHTML = `
                <div class="alert alert-danger mt-3" role="alert">
                    Не удалось загрузить результаты поиска. Попробуйте позже.
                </div>`;
            return;
        }

        if (this.products.length === 0) {
            // Показываем сообщение, если ничего не найдено
            resultsContainer.innerHTML = `
                <div class="alert alert-info mt-3" role="alert">
                    По вашему запросу "${this.searchTerm}" ничего не найдено.
                </div>`;
            return;
        }

        // Рендерим найденные товары
        this.products.forEach((product) => {
            // Создаем компонент карточки товара, передавая контейнер результатов как родителя
            const productCard = new ProductCardComponent(resultsContainer);
            // Используем .bind(this), чтобы сохранить контекст `this` внутри handleProductClick
            productCard.render(product, this.handleProductClick.bind(this));
        });
    }
}