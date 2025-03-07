class Tooltip extends HTMLElement {
  constructor() {
    super();
    this._tooltipVisible = false;
    this._tooltipIcon;
    this._tooltipText = "Some dummy text : - P";
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = `
    <style>
        div {
            font-weight: normal;
            background-color: black;
            color: white;
            position: absolute;
            top: 1.5rem;
            ledt: 0.75rem;
            padding: 0.15rem;
            border-radius: 3px;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.26);
            z-index: 1;
        }

        .hightlight {
            color: green;
        }

        :host {
            position: relative;
        }

        :host(.something) {
          background-color: var(--color-primary, #ccc);
          padding: 0.15rem;
        }

        :host-context(p) {
          background-color: yellow;
          font-weight: bold;
        }

        ::slotted(.highlight) {
        border-bottom: 1px dotted red;
        color: green !important;
        }

        .icon {
            cursor: pointer;
            color: white;
            background-color: black;
            padding: 0.25rem 0.6rem;
            border-radius: 50%;
        }
    </style>
    <slot>Some default</slot>
    <span class="icon">?</span>
    `;
  }

  //**PERMETTE DI ACCEDERE AI VARI ELEMENTI DEL DOM COME (tag, attrubuti ecc...)*/
  connectedCallback() {
    if (this.hasAttribute("text")) {
      this._tooltipText = this.getAttribute("text");
    }
    this._tooltipIcon = this.shadowRoot.querySelector("span");
    this._tooltipIcon.addEventListener(
      "mouseenter",
      this._showTooltip.bind(this),
    );
    this._tooltipIcon.addEventListener(
      "mouseleave",
      this._hideTooltip.bind(this),
    );
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) return;
    if (name === "text") {
      this._tooltipText = newValue;
    }
  }

  static get observedAttributes() {
    return ["text"];
  }

  disconnectedCallback() {
    this._tooltipIcon.removeEventListener("mouseenter", this._showTooltip);
    this._tooltipIcon.removeEventListener("mouseleave", this._hideTooltip);
  }


  //**  questo render methods serve per avere tutti gli elementi del dom in un'unico posto e non avere disordine nel codice */
  _render() {
    let tooltipContainer = this.shadowRoot.querySelector("div");
    if (this._tooltipVisible) {
      tooltipContainer = document.createElement("div");
      tooltipContainer.textContent = this._tooltipText;
      this.shadowRoot.appendChild(tooltipContainer);
    } else {
      if (tooltipContainer) {
        this.shadowRoot.removeChild(tooltipContainer);
      }
    }
  }

  _showTooltip() {
    this._tooltipVisible = true;
    this._render();
  }

  _hideTooltip() {
    this._tooltipVisible = false;
    this._render();
  }
}

customElements.define("far-tooltip", Tooltip);
