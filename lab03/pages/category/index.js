import { ProductCardComponent } from "../../components/product-card/index.js";
import { ProductPage } from "../product/index.js";
import { stockUrls } from '../../utils/stockUrls.js';

export class CategoryPage {
    constructor(parent, category) {
        this.parent = parent;
        this.category = category;
        this.products = [];
    }

    async fetchProducts() {
        try {
            const response = await fetch(stockUrls.searchByFieldExact('category', this.category));
            if (!response.ok) throw new Error('Failed to fetch products');
            this.products = await response.json();
            return true;
        } catch (error) {
            console.error('Error fetching products:', error);
            this.products = [];
            return false;
        }
    }

    clickCard(e) {
        const cardId = e.target.dataset.id;
        const productPage = new ProductPage(this.parent, cardId);
        productPage.render();
    }

    get pageRoot() {
        return document.getElementById("main-page");
    }

    getHTML() {
        return `
            <div class="container d-flex flex-column justify-content-center align-items-center">
                <h2 class="my-4">${this.category}</h2>
                <div id="category-products-container"
                     class="d-flex flex-row flex-wrap justify-content-center gap-3 w-100">
                </div>
            </div>
        `;
    }

    async render() {
        this.parent.innerHTML = ""; // Очищаем #root
        this.parent.insertAdjacentHTML("afterbegin", this.getHTML()); // Вставляем структуру

        // Находим контейнер для карточек
        const productsContainer = document.getElementById('category-products-container');
        if (!productsContainer) {
            console.error('Не найден контейнер для продуктов категории');
            return;
        }

        // Показываем индикатор загрузки внутри контейнера (необязательно, но улучшает UX)
        productsContainer.innerHTML = `
            <div class="spinner-border text-primary my-5" role="status">
                 <span class="visually-hidden">Загрузка...</span>
            </div>`;

        const success = await this.fetchProducts();

        // Очищаем контейнер от спиннера
        productsContainer.innerHTML = '';

        if (!success || this.products.length === 0) {
            productsContainer.innerHTML = '<p class="alert alert-info">Товары в данной категории не найдены</p>';
            return;
        }

        this.products.forEach((item) => {
            // Передаем КОНТЕЙНЕР КАРТОЧЕК как родителя для ProductCardComponent
            const productCard = new ProductCardComponent(productsContainer);
            productCard.render(item, this.clickCard.bind(this));
        });
    }
}