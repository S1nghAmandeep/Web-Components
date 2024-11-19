import '../../stencil.core';
export declare class StockPrice {
    el: HTMLElement;
    stockSymbol: string;
    stockInput: HTMLInputElement;
    fetchPrice: number;
    stockInputValid: boolean;
    stockSymbolProp: string;
    stockSymbolChanged(newValue: string, oldValue: string): void;
    onUserInput(event: Event): void;
    componentWillLoad(): void;
    componentDidLoad(): void;
    componentWillUpdate(): void;
    componentDidUpdate(): void;
    componentDidUnload(): void;
    onFetchStockPrice(event: Event): void;
    onStockSymbolSelected(event: CustomEvent<string>): void;
    fetchStockPrice(): void;
    hostData(): {
        class: string;
    };
    render(): JSX.Element;
}
