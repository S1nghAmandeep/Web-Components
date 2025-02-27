class Prova extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        // this.shadowRoot.innerHTML = `
        //     <button>Click me</button>
        // `;
    }


    connectedCallback() {
        const button = document.createElement('button');
        button.textContent = 'Click me';
        this.shadowRoot.appendChild(button);

        button.addEventListener('click', () => {
            console.log('Button clicked!');
        });

    }
}

customElements.define('bt-prova', Prova);