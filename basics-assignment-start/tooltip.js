class ToopTip extends HTMLElement {
  constructor() {
    super();
    this._isVisible = false;
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = `
        <style>
          #info-box {
            display: none;
           }
        </style>
        <button>Show</button>
        <p id="info-box">
          <slot></slot>
        </p>
        `;
    // qui si possono dichiarare i vari attributi di shadowRoot
    this._toggleButton = this.shadowRoot.querySelector("button");
    this._infoEl = this.shadowRoot.querySelector("#info-box");
    this._toggleButton.addEventListener("click", this._showInfoText.bind(this));
  }
  connectedCallback() {
    //qui vanno elementi che sono prensenti nel dom creati da HTML
    if(this.hasAttribute("is-visible")) {
      if(this.getAttribute("is-visible") === "true") {
        this._isVisible = true;
        this._infoEl.style.display = "block";
        this._toggleButton.textContent = "Hide";
      }
    }
  }

  _showInfoText() {
    this._isVisible = !this._isVisible;
    this._infoEl.style.display = this._isVisible ? "block" : "none";
    this._toggleButton.textContent = this._isVisible ? "Hide" : "Show";
  }
}
customElements.define("test-tooltip", ToopTip);
