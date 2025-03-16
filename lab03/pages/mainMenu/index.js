import { CategoryPage } from "../category/index.js";


export class MainMenuPage {
    constructor(parent) {
        this.parent = parent;
        this.categories = {
            "Овощи и фрукты": [
                {
                    id: 1,
                    src: "https://avatars.mds.yandex.net/get-mpic/3611742/img_id2417822881261828698.jpeg/orig",
                    title: "Яблоки",
                    text: "50 ₽"
                },
                {
                    id: 2,
                    src: "https://avatars.mds.yandex.net/i?id=cab1e7a7d3e811704fa5bc0a4e1aa72b_l-13467976-images-thumbs&n=13",
                    title: "Бананы",
                    text: "60 ₽"
                },
                {
                    id: 3,
                    src: "https://cdn.vseinstrumenti.ru/img/cats/180265.jpg",
                    title: "Морковь",
                    text: "30 ₽"
                }
            ],
            "Бакалея": [
                {
                    id: 4,
                    src: "https://main-cdn.sbermegamarket.ru/big1/hlr-system/-89/297/714/012/710/33/100063950006b0.png",
                    title: "Хлеб",
                    text: "40 ₽"
                }
            ],
            "Молочка": [
                {
                    id: 5,
                    src: "https://www.grvc.ru/uploadedFiles/eshopimages/big/moloko.jpeg",
                    title: "Молоко",
                    text: "55 ₽"
                },
                {
                    id: 6,
                    src: "https://bahetle-sib.ru/storage/goods/132175_Kbt59.jpg",
                    title: "Сыр",
                    text: "120 ₽"
                }
            ]
        };
    }

    handleCategoryClick(category) {
        const categoryPage = new CategoryPage(this.parent, category, this.categories[category]);
        categoryPage.render();
    }

    render() {
        this.parent.innerHTML = "";


        const content = `
            <div class="container text-center">
                <h1>Выберите категорию</h1>
                ${Object.keys(this.categories)
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
