/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */


import './stencil.core';




export namespace Components {

  interface UcSpinner {}
  interface UcSpinnerAttributes extends StencilHTMLAttributes {}

  interface UcStockFinder {}
  interface UcStockFinderAttributes extends StencilHTMLAttributes {
    'onUcSymbolSelected'?: (event: CustomEvent<string>) => void;
  }

  interface UcStockPrice {
    'stockSymbolProp': string;
  }
  interface UcStockPriceAttributes extends StencilHTMLAttributes {
    'stockSymbolProp'?: string;
  }
}

declare global {
  interface StencilElementInterfaces {
    'UcSpinner': Components.UcSpinner;
    'UcStockFinder': Components.UcStockFinder;
    'UcStockPrice': Components.UcStockPrice;
  }

  interface StencilIntrinsicElements {
    'uc-spinner': Components.UcSpinnerAttributes;
    'uc-stock-finder': Components.UcStockFinderAttributes;
    'uc-stock-price': Components.UcStockPriceAttributes;
  }


  interface HTMLUcSpinnerElement extends Components.UcSpinner, HTMLStencilElement {}
  var HTMLUcSpinnerElement: {
    prototype: HTMLUcSpinnerElement;
    new (): HTMLUcSpinnerElement;
  };

  interface HTMLUcStockFinderElement extends Components.UcStockFinder, HTMLStencilElement {}
  var HTMLUcStockFinderElement: {
    prototype: HTMLUcStockFinderElement;
    new (): HTMLUcStockFinderElement;
  };

  interface HTMLUcStockPriceElement extends Components.UcStockPrice, HTMLStencilElement {}
  var HTMLUcStockPriceElement: {
    prototype: HTMLUcStockPriceElement;
    new (): HTMLUcStockPriceElement;
  };

  interface HTMLElementTagNameMap {
    'uc-spinner': HTMLUcSpinnerElement
    'uc-stock-finder': HTMLUcStockFinderElement
    'uc-stock-price': HTMLUcStockPriceElement
  }

  interface ElementTagNameMap {
    'uc-spinner': HTMLUcSpinnerElement;
    'uc-stock-finder': HTMLUcStockFinderElement;
    'uc-stock-price': HTMLUcStockPriceElement;
  }


}
