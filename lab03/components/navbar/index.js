import { SearchResultsPage } from '../../pages/searchResults/index.js';
import { CartPage } from '../../pages/cart/index.js'; // <-- Импортируем страницу корзины
import { updateNavbarCartCount } from '../../utils/cart.js'; // <-- Импортируем функцию обновления счетчика


export function renderNavbar(parentElement, insertBeforeElement) {
    const navbarHTML = `
    <nav class="navbar navbar-expand-lg navbar-light bg-light mb-3">
      <div class="container">
        <a class="navbar-brand" href="/" id="logo">FoodMarket</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <form class="d-flex me-auto ms-lg-3 my-2 my-lg-0" id="search-form" role="search">
            <input class="form-control me-2" type="search" placeholder="Найти блюдо..." aria-label="Search" id="search-input" />
            <button class="btn btn-outline-success" type="submit">Поиск</button>
          </form>
          <ul class="navbar-nav ms-auto">
            <li class="nav-item">
               <a href="#" class="btn btn-success ms-3 position-relative" id="navbar-cart-link">
                 Корзина
               </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    `;

    insertBeforeElement.insertAdjacentHTML('beforebegin', navbarHTML);

    const searchForm = document.getElementById('search-form');
    const searchInput = document.getElementById('search-input');
    const rootElement = document.getElementById('root');
    const cartLink = document.getElementById('navbar-cart-link'); // <-- Находим ссылку на корзину

    if (searchForm && searchInput && rootElement) {
        searchForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const searchTerm = searchInput.value.trim();
            if (searchTerm) {
                const searchPage = new SearchResultsPage(rootElement, searchTerm);
                searchPage.render();
            } else {
                console.log('Поле поиска пустое, поиск не выполняется.');
            }
        });
    } else {
        console.error('Не удалось найти форму поиска, поле ввода или корневой элемент #root.');
    }

    // обработчик для ссылки на корзину ---
    if (cartLink && rootElement) {
        cartLink.addEventListener('click', (event) => {
            event.preventDefault(); // Предотвращаем переход по #
            const cartPage = new CartPage(rootElement); // Создаем страницу корзины
            cartPage.render(); // Рендерим её в #root
        });
    } else {
        console.error('Не удалось найти ссылку на корзину или корневой элемент #root.');
    }

    updateNavbarCartCount();
}