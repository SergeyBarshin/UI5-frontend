import { ProductComponent } from "../../components/product/index.js";
import { stockUrls } from '../../utils/stockUrls.js';

export class ProductPage {
    constructor(parent, productId) {
        if (!parent) throw new Error("Parent element is required");
        if (!productId) throw new Error("Product ID is required");

        this.parent = parent;
        this.productId = productId;
    }

    async fetchProduct() {
        try {
            const response = await fetch(stockUrls.getStockById(this.productId));
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            return await response.json();
        } catch (error) {
            console.error('Failed to fetch product:', error);
            return null;
        }
    }

    renderLoading() {
        this.parent.innerHTML = `
            <div class="container text-center py-5">
                <div class="spinner-border text-primary" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
                <p class="mt-2">Загрузка товара...</p>
            </div>
        `;
    }

    renderError() {
        this.parent.innerHTML = `
            <div class="container text-center py-5">
                <div class="alert alert-danger">
                    <h4>Ошибка загрузки</h4>
                    <p>Не удалось загрузить данные товара</p>
                    <button id="back-btn" class="btn btn-secondary mt-2">Назад</button>
                </div>
            </div>
        `;

        document.getElementById('back-btn')?.addEventListener('click', () => {
            window.history.back();
        });
    }

    async render() {
        this.renderLoading();

        const productData = await this.fetchProduct();

        if (!productData) {
            this.renderError();
            return;
        }

        this.parent.innerHTML = '<div id="product-root"></div>';
        const productRoot = document.getElementById('product-root');

        // Теперь передаем категорию в конструктор
        new ProductComponent(productRoot, productData.category).render(productData);
    }
}