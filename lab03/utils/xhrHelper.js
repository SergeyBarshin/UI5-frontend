
export function makeXhrRequest(method, url, data = null) {
    return new Promise((resolve, reject) => {
        // 1. Создаем объект XHR
        const xhr = new XMLHttpRequest();

        // 2.метод, URL, асинхронный режим (true)
        xhr.open(method, url, true);

        if (data) {
            xhr.setRequestHeader('Content-Type', 'application/json');
        }
        xhr.setRequestHeader('Accept', 'application/json');


        // Обработчик успешного ЗАВЕРШЕНИЯ запроса (с любым статусом)
        xhr.onload = function () {
            if (xhr.status >= 200 && xhr.status < 300) {
                try {
                    const responseData = JSON.parse(xhr.responseText);
                    resolve(responseData); // Разрешаем Promise с данными
                } catch (parseError) {
                    console.error("XHR JSON Parse Error:", parseError, "Response Text:", xhr.responseText);
                    reject(new Error(`Ошибка парсинга JSON: ${parseError.message}`));
                }
            } else {
                console.error("XHR HTTP Error:", xhr.status, xhr.statusText, "URL:", url);
                // Отклоняем Promise с информацией об ошибке
                reject(new Error(`HTTP ошибка ${xhr.status}: ${xhr.statusText || 'Unknown error'}`));
            }
        };

        // Обработчик сетевых ошибок (не удалось подключиться и т.п.)
        xhr.onerror = function () {
            console.error("XHR Network Error. URL:", url);
            reject(new Error('Сетевая ошибка при выполнении запроса'));
        };

        // Обработчик таймаута (опционально)
        xhr.ontimeout = function () {
            console.error("XHR Timeout Error. URL:", url);
            reject(new Error('Превышено время ожидания запроса'));
        };
        // xhr.timeout = 10000; // Установить таймаут в мс (например, 10 секунд)

        xhr.send(data ? JSON.stringify(data) : null);
    });
}