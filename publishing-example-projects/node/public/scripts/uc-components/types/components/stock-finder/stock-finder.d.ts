import '../../stencil.core';
import { EventEmitter } from '../../stencil.core';
export declare class StockFinder {
    el: HTMLElement;
    stockNameInput: HTMLInputElement;
    ucSymbolSelected: EventEmitter<string>;
    searchResult: {
        symbol: string;
        name: string;
    }[];
    onFindStocks(event: Event): void;
    onSelectSymbol(symbol: string): void;
    render(): JSX.Element[];
}
