import { MainMenuPage } from "./pages/mainMenu/index.js";


document.addEventListener("DOMContentLoaded", () => {
    const root = document.getElementById('root')
    const mainMenuPage = new MainMenuPage(root);
    mainMenuPage.render();
});
/*
1) сделать главную страницу меню, в которой выбирать категории, [+] 
2) переход по категории, оказываются вкладки только этой категории [+] 
3) на отдельной вкладке, кнопка вернуться назад в категорию и назад в главное меню
    в главное - href \
    на категорию - через рендер
*/