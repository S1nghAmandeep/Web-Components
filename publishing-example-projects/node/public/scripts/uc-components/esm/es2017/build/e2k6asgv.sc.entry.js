/*! Built with http://stenciljs.com */
import { h } from '../mycomponent.core.js';

class StockFinder {
    constructor() {
        this.searchResult = [];
    }
    onFindStocks(event) {
        event.preventDefault();
        fetch(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=tesco&apikey=demo`)
            .then(response => response.json())
            .then(data => {
            this.searchResult = data['bestMatches'].map(match => ({ symbol: match['1. symbol'], name: match['2. name'] }));
            console.log(this.searchResult);
        })
            .catch(error => console.log(error));
    }
    onSelectSymbol(symbol) {
        this.ucSymbolSelected.emit(symbol);
    }
    render() {
        return [
            h("form", { onSubmit: this.onFindStocks.bind(this) },
                h("input", { ref: el => this.stockNameInput = el }),
                h("button", { type: "submit" }, "Find")),
            h("ul", null, this.searchResult.map(result => h("li", { onClick: this.onSelectSymbol.bind(this, result.symbol) },
                h("strong", null, result.name),
                " - (",
                result.symbol,
                ")")))
        ];
    }
    static get is() { return "uc-stock-finder"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "el": {
            "elementRef": true
        },
        "searchResult": {
            "state": true
        }
    }; }
    static get events() { return [{
            "name": "ucSymbolSelected",
            "method": "ucSymbolSelected",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
    static get style() { return ".sc-uc-stock-finder-h{font-family:sans-serif;border:2px solid #3d003d;margin:2rem;padding:1rem;display:block;width:20rem;max-width:100%}form.sc-uc-stock-finder   input.sc-uc-stock-finder{font:inherit;color:#3d003d;padding:.1rem .25rem;display:block;margin:.5rem 0;width:96%}form.sc-uc-stock-finder   button.sc-uc-stock-finder:focus, form.sc-uc-stock-finder   input.sc-uc-stock-finder:focus{outline:none}form.sc-uc-stock-finder   button.sc-uc-stock-finder{font:inherit;padding:.25rem .5rem;border:1px solid #3d003d;background-color:#3d003d;color:#fff;cursor:pointer;width:100%;border-radius:50px}form.sc-uc-stock-finder   button.sc-uc-stock-finder:active, form.sc-uc-stock-finder   button.sc-uc-stock-finder:hover{background:#750175;border-color:#750175}form.sc-uc-stock-finder   button.sc-uc-stock-finder:disabled{background:#ccc;border-color:#ccc;cursor:not-allowed}ul.sc-uc-stock-finder{margin:0;padding:0;list-style:none}li.sc-uc-stock-finder{margin:.25rem;padding:.25rem;border:1px solid #ccc}li.sc-uc-stock-finder:active, li.sc-uc-stock-finder:hover{background-color:#3b013b;color:#fff;cursor:pointer}"; }
}

export { StockFinder as UcStockFinder };
