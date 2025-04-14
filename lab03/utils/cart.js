const CART_KEY = 'shoppingCart';

export function getCart() {
    const cartJson = localStorage.getItem(CART_KEY);
    try {
        return cartJson ? JSON.parse(cartJson) : [];
    } catch (e) {
        console.error("Ошибка парсинга корзины из localStorage:", e);
        return []; // Возвращаем пустой массив в случае ошибки
    }
}


function saveCart(cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    // Обновляем счетчик в навбаре после каждого сохранения
    updateNavbarCartCount();
}


export function addToCart(product) {
    const cart = getCart();
    const existingProductIndex = cart.findIndex(item => item.id === product.id);

    if (existingProductIndex > -1) {
        // Товар уже есть, увеличиваем количество
        cart[existingProductIndex].quantity = (cart[existingProductIndex].quantity || 1) + 1;
    } else {
        // Нового товара нет, добавляем с количеством 1
        cart.push({ ...product, quantity: 1 });
    }
    saveCart(cart);
    console.log('Товар добавлен/обновлен в корзине:', product.title, 'Новая корзина:', getCart());
    // Можно добавить визуальное подтверждение
    alert(`${product.title} добавлен в корзину!`);
}


export function updateQuantity(productId, quantity) {
    let cart = getCart();
    const productIndex = cart.findIndex(item => item.id === productId);

    if (productIndex > -1) {
        if (quantity > 0) {
            cart[productIndex].quantity = quantity;
        } else {
            // Удаляем товар, если количество <= 0
            cart = cart.filter(item => item.id !== productId);
        }
        saveCart(cart);
    }
}


export function removeFromCart(productId) {
    let cart = getCart();
    cart = cart.filter(item => item.id !== productId);
    saveCart(cart);
    console.log('Товар удален из корзины. ID:', productId, 'Новая корзина:', getCart());
}


export function clearCart() {
    saveCart([]); // Сохраняем пустой массив
    console.log('Корзина очищена.');
}


export function updateNavbarCartCount() {
    const cart = getCart();
    // Считаем общее количество *единиц* товара
    const totalQuantity = cart.reduce((sum, item) => sum + (item.quantity || 0), 0);

    const cartLink = document.getElementById('navbar-cart-link');
    if (cartLink) {
        let badge = cartLink.querySelector('.cart-count-badge');
        if (totalQuantity > 0) {
            if (!badge) {
                // Создаем badge, если его нет
                badge = document.createElement('span');
                // Используем классы Bootstrap для значка
                badge.className = 'badge bg-danger ms-1 cart-count-badge';
                cartLink.appendChild(badge);
            }
            badge.textContent = totalQuantity; // Обновляем текст
        } else {
            // Удаляем badge, если корзина пуста
            badge?.remove();
        }
    }
}