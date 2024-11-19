export class Spinner {
    render() {
        return (h("div", { class: "loader" }));
    }
    static get is() { return "uc-spinner"; }
    static get encapsulation() { return "shadow"; }
    static get style() { return "/**style-placeholder:uc-spinner:**/"; }
}
