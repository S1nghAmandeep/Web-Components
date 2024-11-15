class ConfirmLink extends HTMLAnchorElement {
  connectedCallback() {
    this.addEventListener("click", (e) => {
      if (!confirm("Do you rally want to leave?")) {
        e.preventDefault();
      }
    });
  }
}

customElements.define("far-confirm-link", ConfirmLink, { extends: "a" });
