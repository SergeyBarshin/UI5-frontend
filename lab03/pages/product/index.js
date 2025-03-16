import { ProductComponent } from "../../components/product/index.js";
// import { BackButtonComponent } from "../../components/back-button/index.js";
// import { CategoryPage } from "../../pages/category/index.js";

export class ProductPage {
    constructor(parent, id, data, categoryName, products) {
        this.parent = parent;
        this.id = id;
        this.data = data; // то из чего рисуем картинку
        this.categoryName = categoryName; // 
        this.products = products;

        console.log
    }

    getData() {
        return {
            id: this.id,
            src: this.data.src,
            title: this.data.title,
            text: this.data.text,
        };
    }

    get pageRoot() {
        return document.getElementById("product-page");
    }

    getHTML() {
        return `
            <div id="product-page" class="container d-flex flex-column justify-content-center align-items-center vh-100">
            </div>
        `;
    }

    render() {
        this.parent.innerHTML = "";

        this.parent.insertAdjacentHTML("beforeend", this.getHTML());

        const data = this.getData();
        const product = new ProductComponent(this.pageRoot, this.categoryName, this.products);
        product.render(data);
    }
}
