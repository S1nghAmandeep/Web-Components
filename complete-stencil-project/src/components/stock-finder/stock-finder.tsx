import { Component, Element, Event, EventEmitter, State } from '@stencil/core';
// import { API_KEY } from '../../global/global';

@Component({
    tag: 'uc-stock-finder',
    styleUrl: 'stock-finder.css',
    shadow: true
})
export class StockFinder {
    @Element() el: HTMLElement;
    stockNameInput: HTMLInputElement;
    @Event({ bubbles: true, composed: true }) ucSymbolSelected: EventEmitter<string>;

    @State() searchResult: { symbol: string, name: string }[] = [];

    onFindStocks(event: Event) {
        event.preventDefault();
        fetch(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=tesco&apikey=demo`)
            .then(response => response.json())
            .then(data => {
                this.searchResult = data['bestMatches'].map(match => ({ symbol: match['1. symbol'], name: match['2. name'] }));
                console.log(this.searchResult);

            })
            .catch(error => console.log(error));
    }

    onSelectSymbol(symbol: string) {
        this.ucSymbolSelected.emit(symbol);
    }

    render() {
        return [
            <form onSubmit={this.onFindStocks.bind(this)}>
                <input ref={el => this.stockNameInput = el} />
                <button type="submit">Find</button>
            </form>,
            <ul>
                {this.searchResult.map(result => <li onClick={this.onSelectSymbol.bind(this, result.symbol)}><strong>{result.name}</strong> - ({result.symbol})</li>)}
            </ul>
        ];
    }
}