export class ProductCardComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML(data) {
        // Проверяем наличие необходимых данных
        const imgSrc = data.src || 'https://via.placeholder.com/300x200?text=No+Image';
        const title = data.title || 'Без названия';
        const text = data.text || 'Описание отсутствует';
        const id = data.id || '';

        return `
        <div class="m-3 card shadow-lg rounded-3 overflow-hidden" style="width: 300px; border: none;">
            <img class="card-img-top" src="${imgSrc}" alt="${title}" style="object-fit: cover; height: 200px;">
            <div class="card-body p-3">
                <h5 class="card-title text-truncate" style="font-size: 1.1rem; padding-bottom: 10px;">${title}</h5>
                <h3 class="card-text text-muted" style="font-size: 0.9rem; line-height: 1.4; padding-bottom: 15px;">${text}</h3>
                <button class="btn btn-primary w-100 mt-3" id="click-card-${id}" data-id="${id}">
                    Подробнее
                </button>
            </div>
        </div>
        `;
    }

    addListeners(data, listener) {
        const buttonId = `click-card-${data.id || ''}`;
        const button = document.getElementById(buttonId);

        if (button && listener) {
            button.addEventListener("click", listener);
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