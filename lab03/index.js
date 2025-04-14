import { MainMenuPage } from "./pages/mainMenu/index.js";
import { renderNavbar } from "./components/navbar/index.js";

document.addEventListener("DOMContentLoaded", () => {
    const root = document.getElementById('root');
    const body = document.body;

    renderNavbar(body, root);

    const mainMenuPage = new MainMenuPage(root);
    mainMenuPage.render();


    const logo = document.getElementById('logo');
    if (logo) {
        logo.addEventListener('click', (event) => {
            event.preventDefault();
            const homePage = new MainMenuPage(root);
            homePage.render();
        });
    }
});