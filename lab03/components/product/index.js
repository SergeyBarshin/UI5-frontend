import { CategoryPage } from "../../pages/category/index.js";

export class ProductComponent {
    constructor(parent, category) {
        this.parent = parent;
        this.category = category; // Теперь принимаем категорию извне
    }

    getHTML(data) {
        return `
        <div class="d-flex justify-content-center">
            <div class="card mb-3 shadow-lg rounded-3 p-3" style="width: 540px;">
                <div class="d-flex w-100 justify-content-start gap-2 mb-3">
                    <button id="home-btn" class="btn btn-primary">На главную</button>
                    <button id="category-btn" class="btn btn-secondary">Вернуться в категорию</button>
                </div>

                <div class="row g-0">
                    <div class="col-md-4 d-flex align-items-center">
                        <img src="${data.src || 'https://via.placeholder.com/200'}" 
                             class="img-fluid rounded" 
                             alt="${data.title || 'Товар'}">
                    </div>
                    
                    <div class="col-md-8">
                        <div class="card-body">
                            <h3 class="mb-2">
                                <span class="badge bg-secondary">${data.title || 'Без названия'}</span>
                            </h3>
                            <p class="text-muted">Цена: ${data.text || '—'}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `;
    }

    clickBackToCategory() {
        this.parent.innerHTML = "";

        // const categoryPage = new CategoryPage(this.pageRoot, this.category, this.products);
        const categoryPage = new CategoryPage(this.parent, this.category,);
        categoryPage.render();

        //     const categoryPage = new CategoryPage(this.parent, this.categoryId);
        //   categoryPage.render();
    }

    addEventListeners() {
        document.getElementById('home-btn')?.addEventListener('click', () => {
            window.location.href = '/';
        });

        // Кнопка "Вернуться в категорию"
        document.getElementById("category-btn").addEventListener("click", () => {
            this.clickBackToCategory();
        });

        /*document.getElementById('category-btn')?.addEventListener('click', () => {
            if (this.category) {
                window.location.href = `/category?name=${encodeURIComponent(this.category)}`;
            }
        });*/
    }

    render(data) {
        if (!this.parent || !data) return;

        this.parent.innerHTML = this.getHTML(data);
        this.addEventListeners();
    }
}