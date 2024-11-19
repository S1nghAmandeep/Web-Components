import { Component, h, Listen, Method, Prop, State } from "@stencil/core";

@Component({
    tag: 'uc-tooltip',
    styleUrl: 'tooltip.css',
    shadow: true
})
export class Tooltip {

    @Prop() text: string;
    @State() opened: boolean = false;

    @Method()
    toggleTooltip() {
        console.log('toogled');

        this.opened = !this.opened;
    }


    @Listen('provadelListne')
    provadelListne(event: CustomEvent) {
        console.log('provadelListne');
    }

    render() {
        let tooltipText = null;
        if (this.opened) {
            tooltipText = <p id="tooltip-text">{this.text}</p>;
        }
        return (
            <span>
                <slot />
                <span onClick={() => this.opened = !this.opened} id="tooltip-icon">?</span>
                {tooltipText}
            </span>
        )
    }
}