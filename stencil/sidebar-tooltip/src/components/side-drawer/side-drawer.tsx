import { Component, h, Method, Prop, State } from '@stencil/core';

@Component({
    tag: 'uc-side-drawer',
    styleUrl: './side-drawer.css',
    shadow: true
})
export class SideDrawer {
    @State() showContactInfo: boolean = false;
    @Prop({ reflect: true }) title: string;
    @Prop({ reflect: true, mutable: true }) opened: boolean;

    onCloseDrawer() {
        this.opened = false;
    }

    onContentChange(content: string) {
        this.showContactInfo = content === 'contact';
    }

    @Method()
    open() {
        this.opened = true;
    }
    

    render() {
        let mainContent = <slot />;
        if(this.showContactInfo) {
            mainContent = (
                <div id="contact-information">
                    <h2>Contact Information</h2>
                    <p>You can reach us via phone or email</p>
                    <ul>
                        <li>
                            Phone:
                            <a href="#"> +49 123 456 7890</a>
                        </li>
                        <li>
                            E-Mail:
                            <a href="#"> Something@example.com</a>
                        </li>
                    </ul>
                </div>
            );
        }
        return [
            <div onClick={this.onCloseDrawer.bind(this)} id="backdrop" />,
            <aside>
                <header>
                    <h1>{this.title}</h1>
                    <button onClick={this.onCloseDrawer.bind(this)}>X</button>
                </header>
                <section id="tabs">
                    <button class={!this.showContactInfo ? 'active' : ''} onClick={this.onContentChange.bind(this, 'nav')}>Navigation</button>
                    <button class={this.showContactInfo ? 'active' : ''} onClick={this.onContentChange.bind(this, 'contact')}>Contact</button>
                </section>
                <main>
                    {mainContent}
                </main>
            </aside>
        ];
    }
}