import { ProductCardComponent } from "../../components/product-card/index.js";
import { ProductPage } from "../product/index.js";

export class CategoryPage {
    constructor(parent, category) {
        this.parent = parent;
        this.category = category;
        this.products = [];
    }

    async fetchProducts() {
        try {
            const response = await fetch(`http://localhost:8000/stocks/search?field=category&val=${encodeURIComponent(this.category)}`);
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
                <div id="main-page" class="d-flex flex-wrap justify-content-center"></div>
            </div>
        `;
    }

    async render() {
        this.parent.innerHTML = "";
        this.parent.insertAdjacentHTML("afterbegin", this.getHTML());

        const success = await this.fetchProducts();

        if (!success || this.products.length === 0) {
            this.pageRoot.innerHTML = '<p>Товары не найдены</p>';
            return;
        }

        this.products.forEach((item) => {
            const productCard = new ProductCardComponent(this.pageRoot);
            productCard.render(item, this.clickCard.bind(this));
        });
    }
}