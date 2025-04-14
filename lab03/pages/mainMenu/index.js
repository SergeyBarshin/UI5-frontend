import { CategoryPage } from "../category/index.js";
import { stockUrls } from '../../utils/stockUrls.js';


export class MainMenuPage {
    constructor(parent) {
        this.parent = parent
        this.categories = []

    }

    async fetchAndSetCategories() {
        try {
            const response = await fetch(stockUrls.getCategories());
            if (!response.ok) throw new Error('Failed to fetch categories');
            this.categories = await response.json();
        } catch (error) {
            console.error('Error fetching categories:', error);
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
