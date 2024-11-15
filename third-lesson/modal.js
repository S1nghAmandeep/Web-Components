class Modal extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = `
    <style>
      #backdrop {
        display: block;
        position:fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100vh;
        background: rgba(0,0,0,0.75);
        z-index: 10;
        opacity: 0;
        pointer-events: none;
        transition: all 0.3s ease-in-out;
      }

      #modal {
        z-index: 11;
        position: fixed;
        width: 50%;
        top: -50vh;
        left: 25%;
        transform: translateY(-50%);
        background: white;
        border-radius: 5px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.26);
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        opacity: 0;
        transition: all 0.3s ease-in-out;
      }

      .open {
        top: 20vh !important;
        opacity: 1 !important;
      }

      .open-backdrop {
        opacity: 1 !important;
        pointer-events: all !important;
      }

      header {
        padding: 1rem;
        border-bottom: 1px solid #ccc;
      }

      ::slotted(h1) {
        font-size: 1.25rem;
        margin: 0;
      }

      #main {
        padding: 1rem;
      }

      #actions {
        border-top: 1px solid #ccc;
        padding: 1rem;
        display: flex;
        justify-content: flex-end;
      }

      #actions button {
        margin: 0 0.5rem;
        border: 1px solid #ccc;
        background: white;
        border-radius: 3px;
        padding: 0.5rem 1rem;
        cursor: pointer;
      }
        
      #actions  button:nth-child(1) {
        background: lightblue;
      }
    </style>
    <div id="backdrop"></div>
    <div id="modal">
        <header>
            <slot name="title">Please confirm</slot>
        </header>
        <section id="main">
            <slot></slot>
        </section>
        <footer id="actions">
            <button>Confirm</button>
            <button>Cancel</button>
        </footer>
    </div>
    `;

    // const slots = this.shadowRoot.querySelectorAll("slot");
    // slots.forEach((slot) => {
    //   slot.addEventListener("slotchange", () => {
    //     this._render();
    //   });
    // });

    const cancelButton = this.shadowRoot.querySelector("button:nth-child(2)");
    const confirmButton = this.shadowRoot.querySelector("button:nth-child(1)");
    cancelButton.addEventListener("click", this._cancel.bind(this));
    confirmButton.addEventListener("click", this._confirm.bind(this));
    // cancelButton.addEventListener("cancel", () => {
    //     console.log('cancel ');
    // });
    const backdrop = this.shadowRoot.querySelector("#backdrop");
    backdrop.addEventListener("click", this._cancel.bind(this));
}

connectedCallback() {
    const _openModal = document.querySelector("button");
    _openModal.addEventListener("click", this._open.bind(this));

  }

  _open() {    
    this.shadowRoot.querySelector("#backdrop").classList.add("open-backdrop");
    this.shadowRoot.querySelector("#modal").classList.add("open");
  }

  _close() {
    this.shadowRoot.querySelector("#backdrop").classList.remove("open-backdrop");
    this.shadowRoot.querySelector("#modal").classList.remove("open");
  }

  _cancel(event) {
    this._close();
    const cancelEvent = new Event('cancel', { bubbles: true, composed: true });
    event.target.dispatchEvent(cancelEvent);
  }

  _confirm(e) {
    this._close();
    const confirmEvent = new Event('confirm');
    this.dispatchEvent(confirmEvent);
  }
}

customElements.define("uc-modal", Modal);
