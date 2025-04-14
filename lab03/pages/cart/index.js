// pages/cart/index.js
import { getCart, updateQuantity, removeFromCart, clearCart } from '../../utils/cart.js';
import { ProductPage } from '../product/index.js'; // Для перехода к товару
import { MainMenuPage } from '../mainMenu/index.js'; // Для кнопки "Продолжить покупки"

export class CartPage {
    constructor(parent) {
        this.parent = parent;
    }

    handleProductClick(productId) {
        if (productId) {
            const productPage = new ProductPage(this.parent, productId);
            productPage.render();
        }
    }

    continueShopping() {
        const mainMenu = new MainMenuPage(this.parent);
        mainMenu.render();
    }

    // Генерация HTML для одного элемента корзины
    getCartItemHTML(item) {
        const imgSrc = item.src || 'https://via.placeholder.com/100x100?text=No+Image';
        return `
            <div class="list-group-item d-flex align-items-center gap-3 cart-item" data-product-id="${item.id}">
                <img src="${imgSrc}" alt="${item.title}" style="width: 80px; height: 80px; object-fit: cover;" class="rounded">
                <div class="flex-grow-1">
                    <h5 class="mb-1 cart-item-title" style="cursor: pointer;" title="Перейти к товару">${item.title}</h5>
                    <p class="mb-1 text-muted">Цена: ${item.text}</p>
                    <div class="d-flex align-items-center gap-2 mt-1">
                        <button class="btn btn-outline-secondary btn-sm quantity-decrease">-</button>
                        <span class="quantity fw-bold">${item.quantity}</span>
                        <button class="btn btn-outline-secondary btn-sm quantity-increase">+</button>
                    </div>
                </div>
                <button class="btn btn-outline-danger btn-sm remove-item">Удалить</button>
            </div>
        `;
    }

    // Генерация HTML для всей корзины
    getCartHTML(cart) {
        if (cart.length === 0) {
            return `
                <div class="container py-5 text-center">
                    <h2>Ваша корзина пуста</h2>
                    <p class="lead text-muted">Самое время добавить что-нибудь!</p>
                    <button class="btn btn-primary mt-3 continue-shopping-btn">Продолжить покупки</button>
                </div>
            `;
        }

        const itemsHTML = cart.map(this.getCartItemHTML).join('');
        // Считаем общую стоимость
        const totalCost = cart.reduce((sum, item) => {
            const price = parseFloat(String(item.text).replace(/[^0-9.,]/g, '').replace(',', '.')) || 0;
            return sum + price * item.quantity;
        }, 0);

        return `
            <div class="container py-4">
                <div class="d-flex justify-content-between align-items-center mb-4">
                     <h2>Ваша корзина</h2>
                     <button class="btn btn-danger clear-cart-btn ${cart.length === 0 ? 'disabled' : ''}">Очистить корзину</button>
                </div>
                <div class="list-group mb-4">
                    ${itemsHTML}
                </div>
                <div class="d-flex justify-content-end align-items-center">
                    <h4>Итого: ${totalCost.toFixed(2)} ₽</h4>
                     <button class="btn btn-success ms-3 checkout-btn ${cart.length === 0 ? 'disabled' : ''}">Оформить заказ</button>
                </div>
                <div class="mt-4 text-center">
                    <button class="btn btn-secondary continue-shopping-btn">Продолжить покупки</button>
                </div>
            </div>
        `;
    }

    // Добавление слушателей событий для кнопок корзины
    addCartListeners() {
        const cartContainer = this.parent.querySelector('.container');
        if (!cartContainer) return;

        cartContainer.addEventListener('click', (event) => {
            const target = event.target;
            const cartItemElement = target.closest('.cart-item');
            const productId = cartItemElement?.dataset.productId ? parseInt(cartItemElement.dataset.productId, 10) : null;

            if (target.classList.contains('quantity-increase')) {
                if (productId === null) return;
                const currentQuantity = getCart().find(item => item.id === productId)?.quantity || 0;
                updateQuantity(productId, currentQuantity + 1);
                this.render(); // Перерисовываем корзину
            } else if (target.classList.contains('quantity-decrease')) {
                if (productId === null) return;
                const currentQuantity = getCart().find(item => item.id === productId)?.quantity || 0;
                if (currentQuantity > 0) { // Не даем уйти в минус, удаление через кнопку
                    updateQuantity(productId, currentQuantity - 1);
                    this.render(); // Перерисовываем корзину
                }
            } else if (target.classList.contains('remove-item')) {
                if (productId === null) return;
                if (confirm(`Удалить "${cartItemElement.querySelector('h5').textContent}" из корзины?`)) {
                    removeFromCart(productId);
                    this.render(); // Перерисовываем корзину
                }
            } else if (target.classList.contains('clear-cart-btn')) {
                if (getCart().length > 0 && confirm('Вы уверены, что хотите очистить всю корзину?')) {
                    clearCart();
                    this.render(); // Перерисовываем корзину
                }
            } else if (target.classList.contains('cart-item-title')) {
                if (productId !== null) {
                    this.handleProductClick(productId); // Переход на страницу товара
                }
            } else if (target.classList.contains('continue-shopping-btn')) {
                this.continueShopping(); // Переход на главную
            } else if (target.classList.contains('checkout-btn')) {
                if (getCart().length > 0) {
                    alert('Переход к оформлению заказа (пока не реализовано)');
                    // Здесь будет логика оформления
                }
            }
        });
    }


    render() {
        const cart = getCart();
        this.parent.innerHTML = this.getCartHTML(cart);
        this.addCartListeners(); // Добавляем слушатели после рендеринга HTML
    }
}