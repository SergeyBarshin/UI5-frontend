import { addToCart } from '../../utils/cart.js'; // <-- Импортируем функцию добавления

export class ProductCardComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML(data) {
        const imgSrc = data.src || 'https://via.placeholder.com/300x200?text=No+Image';
        const title = data.title || 'Без названия';
        const text = data.text || 'Описание отсутствует';
        const id = data.id || '';

        // Убрал фиксированную ширину, чтобы flexbox лучше управлял размером
        return `
        <div class="card shadow-lg rounded-3 overflow-hidden m-2" style="border: none; flex-basis: 300px; flex-grow: 1; max-width: 350px;">
            <img class="card-img-top" src="${imgSrc}" alt="${title}" style="object-fit: cover; height: 200px;">
            <div class="card-body p-3 d-flex flex-column">
                <h5 class="card-title text-truncate" style="font-size: 1.1rem; padding-bottom: 10px;">${title}</h5>
                <h3 class="card-text text-muted" style="font-size: 0.9rem; line-height: 1.4; padding-bottom: 15px;">${text}</h3>

                <div class="mt-auto d-flex gap-2">
                    <button class="btn btn-primary flex-grow-1" id="click-card-${id}" data-id="${id}">
                        Подробнее
                    </button>
                    <button class="btn btn-outline-success add-to-cart-btn" data-product-id="${id}">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cart-plus" viewBox="0 0 16 16">
                           <path d="M9 5.5a.5.5 0 0 0-1 0V7H6.5a.5.5 0 0 0 0 1H8v1.5a.5.5 0 0 0 1 0V8h1.5a.5.5 0 0 0 0-1H9z"/>
                           <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1zm3.915 10L3.102 4h10.796l-1.313 7zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0m7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0"/>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
        `;
    }

    addListeners(data, listener) {
        const detailsButtonId = `click-card-${data.id || ''}`;
        const detailsButton = document.getElementById(detailsButtonId);
        if (detailsButton && listener) {
            detailsButton.addEventListener("click", listener);
        }

        // Ищем кнопку по классу и data-атрибуту внутри родительского элемента карточки
        const cardElement = document.getElementById(detailsButtonId)?.closest('.card');
        const cartButton = cardElement?.querySelector(`.add-to-cart-btn[data-product-id="${data.id}"]`);

        if (cartButton) {
            cartButton.addEventListener('click', (event) => {
                event.stopPropagation(); // Опционально: остановить всплытие, если карточка сама кликабельна
                console.log('Клик по кнопке корзины для товара ID:', data.id);
                addToCart(data); // Вызываем функцию добавления в корзину из утилит
            });
        } else {
            console.warn(`Кнопка корзины не найдена для товара ID: ${data.id}`);
        }
    }

    render(data, listener) {
        try {
            if (!data) {
                console.error('Product data is undefined');
                return;
            }
            const html = this.getHTML(data);
            this.parent.insertAdjacentHTML('beforeend', html);
            this.addListeners(data, listener);
        } catch (error) {
            console.error('Error rendering product card:', error);
        }
    }
}