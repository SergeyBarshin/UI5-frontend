import { ProductCardComponent } from "../../components/product-card/index.js";
import { ProductPage } from "../product/index.js";

export class CategoryPage {
    constructor(parent, category, products) {
        this.parent = parent;
        this.category = category;
        this.products = products;
    }

    clickCard(e) {
        const cardId = e.target.dataset.id;
        const product = this.products.find((item) => item.id == cardId);
        console.log(this.parent, cardId, product, this.category, this.products)
        const productPage = new ProductPage(this.parent, cardId, product, this.category, this.products);
        productPage.render();
    }

    get pageRoot() {
        return document.getElementById("main-page");
    }

    getHTML() {
        return `
            <div class="container d-flex flex-column justify-content-center align-items-center vh-100">
                <h2>${this.category}</h2>
                <div id="main-page" class="d-flex flex-wrap justify-content-center align-items-center text-center"></div>
            </div>
        `;
    }

    render() {
        this.parent.innerHTML = "";

        this.parent.insertAdjacentHTML("afterbegin", this.getHTML());

        this.products.forEach((item) => {
            const productCard = new ProductCardComponent(this.pageRoot, this.products);
            productCard.render(item, this.clickCard.bind(this));
        });
    }
}
