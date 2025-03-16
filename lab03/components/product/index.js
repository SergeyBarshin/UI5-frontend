import { CategoryPage } from "../../pages/category/index.js";
import { MainMenuPage } from "../../pages/mainMenu/index.js";

export class ProductComponent {
    constructor(parent, category, products) {
        this.parent = parent;
        this.category = category;
        this.products = products;
    }

    getHTML(data) {
        return (
            `
        <div class="card mb-3 shadow-lg rounded-3 p-3" style="width: 540px;">
            <div class="d-flex w-100 justify-content-start gap-2 mb-3">
                <button id="home-button" class="btn btn-primary">На главную</button>
                <button id="category-button" class="btn btn-secondary">Вернуться в категорию</button>
            </div>

            <div class="row g-0">
                <div class="col-md-4 d-flex align-items-center">
                    <img src="${data.src}" class="img-fluid rounded" alt="картинка">
                </div>
                
                <!-- Текстовое содержимое -->
                <div class="col-md-8">
                    <div class="card-body">
                        <h3 class="mb-2">
                            <span class="badge bg-secondary">${data.title}</span>
                        </h3>
                        <p class="card-text text-muted">${data.text}</p>
                    </div>
                </div>
            </div>
        </div>
            `
        );
    }

    render(data) {

        this.parent.insertAdjacentHTML("beforeend", this.getHTML(data));

        // Кнопка "На главную"
        document.getElementById("home-button").addEventListener("click", () => {
            window.location.href = "/";
        });

        // Кнопка "Вернуться в категорию"
        document.getElementById("category-button").addEventListener("click", () => {
            this.clickBackToCategory();
        });
    }

    get pageRoot() {
        return document.getElementById("root");
    }

    clickBackToCategory() {
        this.parent.innerHTML = "";

        const categoryPage = new CategoryPage(this.pageRoot, this.category, this.products);
        categoryPage.render();

        //     const categoryPage = new CategoryPage(this.parent, this.categoryId);
        //   categoryPage.render();
    }
}
