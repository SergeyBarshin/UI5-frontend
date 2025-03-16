export class ProductCardComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML(data) {
        return (
            `
            <div class="m-3 card shadow-lg rounded-3 overflow-hidden" style="width: 300px; border: none;">
                <img class="card-img-top" src="${data.src}" alt="картинка" style="object-fit: cover; height: 200px;">
                <div class="card-body p-3">
                    <h5 class="card-title text-truncate" style="font-size: 1.1rem; padding-bottom: 10px;">${data.title}</h5>
                    <h3 class="card-text text-muted" style="font-size: 0.9rem; line-height: 1.4; padding-bottom: 15px;">${data.text}</h3>
                    <button class="btn btn-primary w-100 mt-3" id="click-card-${data.id}" data-id="${data.id}">Подробнее</button>
                </div>
            </div>
            `
        )
    }

    addListeners(data, listener) {
        document
            .getElementById(`click-card-${data.id}`)
            .addEventListener("click", listener)
    }

    render(data, listener) {
        const html = this.getHTML(data)
        this.parent.insertAdjacentHTML('beforeend', html)
        this.addListeners(data, listener)
    }
}