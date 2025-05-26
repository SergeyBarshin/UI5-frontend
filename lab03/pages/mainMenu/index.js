import { CategoryPage } from "../category/index.js";
import { stockUrls } from '../../utils/stockUrls.js';
import { makeXhrRequest } from '../../utils/xhrHelper.js';


export class MainMenuPage {
    constructor(parent) {
        this.parent = parent
        this.categories = []

    }

    async fetchAndSetCategories() {
        try {
            // Используем хелпер XHR
            const categoriesData = await makeXhrRequest('GET', stockUrls.getCategories());
            this.categories = categoriesData;
        } catch (error) {
            console.error('Error fetching categories:', error.message);
            this.categories = [];
        }
    }

    handleCategoryClick(category) {
        const categoryPage = new CategoryPage(this.parent, category);
        categoryPage.render();
    }

    async render() {
        await this.fetchAndSetCategories();
        this.parent.innerHTML = "";

        const content = `
            <div class="container text-center">
                <h1>Выберите категорию</h1>
                ${this.categories
                .map(
                    (category) =>
                        `<button class="btn btn-primary m-2 category-btn" data-category="${category}">
                                ${category}
                            </button>`
                )
                .join("")}
            </div>
        `;
        this.parent.insertAdjacentHTML("beforeend", content);


        document.querySelectorAll(".category-btn").forEach((button) => {
            button.addEventListener("click", (e) => {
                this.handleCategoryClick(e.target.dataset.category);
            });
        });
    }
}
