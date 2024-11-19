import { Component, Element, Listen, Prop, State, Watch } from "@stencil/core";
import { API_KEY } from "../../global/global";

@Component({
    tag: 'uc-stock-price',
    styleUrl: 'stock-price.css',
    shadow: true
})
export class StockPrice {
    @Element() el: HTMLElement;
    @State() stockSymbol: string;
    stockInput: HTMLInputElement;
    @State() fetchPrice: number = 0;
    @State() stockInputValid: boolean = false;

    @Prop({ mutable: true, reflectToAttr: true }) stockSymbolProp: string;

    @Watch('stockSymbolProp')
    stockSymbolChanged(newValue: string, oldValue: string) {
        if (newValue !== oldValue) {
            console.log(newValue, oldValue);

            this.stockSymbol = newValue;
            this.fetchStockPrice();
        }
        this.stockSymbol.trim() !== '' ? this.stockInputValid = true : this.stockInputValid = false;

    }

    onUserInput(event: Event) {
        this.stockSymbol = (event.target as HTMLInputElement).value;
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
        // console.log('will update...');
    }

    componentDidUpdate() {
        // console.log('did update...');
    }

    componentDidUnload() {
        // console.log('did unload...');
    }

    onFetchStockPrice(event: Event) {
        event.preventDefault();
        // this.el.shadowRoot.querySelector('input') as HTMLInputElement;
        this.fetchStockPrice();
    }

    // ** QUESTO SOTTO ESEMPIO E' IL NUOVO MODO DEL LISTNER GLI EVENTI TIPO EMIT DA FRATELLI COMPONENTI */
    // @Listen('ucSymbolSelected', { target: 'body' })

    //** INVECE QUI SOTTO E' IL VECCHIO MODO PER ASCOLTARE EVENTI DI TIPO EMIT */
    @Listen('body:ucSymbolSelected')
    onStockSymbolSelected(event: CustomEvent<string>) {
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
                this.fetchPrice = +data['Global Quote']['05. price']
            })
            .catch(error => console.log(error));
    }


    // ** QUESTO METODO AIUTA AD APPLICARE LE CLASSI DINAMICHE AL COMPONENTE **
    hostData() {
        return { class: this.fetchPrice ? 'success' : 'error' };
    }


    render() {
        return (
            <div>
                <form onSubmit={this.onFetchStockPrice.bind(this)}>
                    <input ref={el => this.stockInput = el} value={this.stockSymbol} onInput={this.onUserInput.bind(this)} id="stock-symbol" />
                    <button type="submit" disabled={!this.stockInputValid}>Fetch</button>
                </form>
                <div>
                    <p>Price: ${this.fetchPrice}</p>
                </div>
            </div>
        );
    }
}