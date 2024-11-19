/*! Built with http://stenciljs.com */
import { h } from '../mycomponent.core.js';

const API_KEY = 'H16YLVPUET6DQX9U';

class StockPrice {
    constructor() {
        this.fetchPrice = 0;
        this.stockInputValid = false;
    }
    stockSymbolChanged(newValue, oldValue) {
        if (newValue !== oldValue) {
            console.log(newValue, oldValue);
            this.stockSymbol = newValue;
            this.fetchStockPrice();
        }
        this.stockSymbol.trim() !== '' ? this.stockInputValid = true : this.stockInputValid = false;
    }
    onUserInput(event) {
        this.stockSymbol = event.target.value;
        this.stockSymbol.trim() !== '' ? this.stockInputValid = true : this.stockInputValid = false;
    }
    componentWillLoad() {
        console.log('will Load...', this.stockSymbolProp);
        this.stockSymbolProp = 'MSFT';
    }
    componentDidLoad() {
        console.log('loaded....', this.stockSymbolProp);
        if (this.stockSymbolProp) {
            this.stockSymbol = this.stockSymbolProp;
            this.fetchStockPrice();
        }
    }
    componentWillUpdate() {
    }
    componentDidUpdate() {
    }
    componentDidUnload() {
    }
    onFetchStockPrice(event) {
        event.preventDefault();
        this.fetchStockPrice();
    }
    onStockSymbolSelected(event) {
        console.log('stock price component', event.detail);
        if (event.detail && event.detail !== this.stockSymbol) {
            this.stockSymbol = event.detail;
            this.stockSymbolProp = event.detail;
        }
    }
    fetchStockPrice() {
        fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${this.stockSymbol}&apikey=${API_KEY}`)
            .then(response => {
            if (response.status !== 200) {
                throw new Error('Something went wrong!');
            }
            return response.json();
        })
            .then(data => {
            if (!data['Global Quote']['05. price']) {
                throw new Error('Invalid symbol!');
            }
            this.fetchPrice = +data['Global Quote']['05. price'];
        })
            .catch(error => console.log(error));
    }
    hostData() {
        return { class: this.fetchPrice ? 'success' : 'error' };
    }
    render() {
        return (h("div", null,
            h("form", { onSubmit: this.onFetchStockPrice.bind(this) },
                h("input", { ref: el => this.stockInput = el, value: this.stockSymbol, onInput: this.onUserInput.bind(this), id: "stock-symbol" }),
                h("button", { type: "submit", disabled: !this.stockInputValid }, "Fetch")),
            h("div", null,
                h("p", null,
                    "Price: $",
                    this.fetchPrice))));
    }
    static get is() { return "uc-stock-price"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "el": {
            "elementRef": true
        },
        "fetchPrice": {
            "state": true
        },
        "stockInputValid": {
            "state": true
        },
        "stockSymbol": {
            "state": true
        },
        "stockSymbolProp": {
            "type": String,
            "attr": "stock-symbol-prop",
            "reflectToAttr": true,
            "mutable": true,
            "watchCallbacks": ["stockSymbolChanged"]
        }
    }; }
    static get listeners() { return [{
            "name": "body:ucSymbolSelected",
            "method": "onStockSymbolSelected"
        }]; }
    static get style() { return ".sc-uc-stock-price-h{font-family:sans-serif;border:2px solid #3d003d;margin:2rem;padding:1rem;display:block;width:20rem;max-width:100%}form.sc-uc-stock-price   input.sc-uc-stock-price{font:inherit;color:#3d003d;padding:.1rem .25rem;display:block;margin:.5rem 0;width:96%}form.sc-uc-stock-price   button.sc-uc-stock-price:focus, form.sc-uc-stock-price   input.sc-uc-stock-price:focus{outline:none}form.sc-uc-stock-price   button.sc-uc-stock-price{font:inherit;padding:.25rem .5rem;border:1px solid #3d003d;background-color:#3d003d;color:#fff;cursor:pointer;width:100%;border-radius:50px}form.sc-uc-stock-price   button.sc-uc-stock-price:active, form.sc-uc-stock-price   button.sc-uc-stock-price:hover{background:#750175;border-color:#750175}form.sc-uc-stock-price   button.sc-uc-stock-price:disabled{background:#ccc;border-color:#ccc;cursor:not-allowed}"; }
}

export { StockPrice as UcStockPrice };
