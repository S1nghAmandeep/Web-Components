export class StockFinder {
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
    static get style() { return "/**style-placeholder:uc-stock-finder:**/"; }
}
