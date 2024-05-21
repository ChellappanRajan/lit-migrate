import {html, css, LitElement} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('simple-greeting')
export class SimpleGreeting extends LitElement {
  static styles = css`p { color: blue }`;

  @property()
  name?:string;

    @property()
  props?:string | 'a' | 'b';

  _name?:string;
  
  render() {
    return html`<p>Hello, ${this.name}!</p>`;
  }
}
