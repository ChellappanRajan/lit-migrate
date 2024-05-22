import {html, css, LitElement} from 'lit';
import {customElement, property,query} from 'lit/decorators.js';

@customElement('simple-greeting')
export class SimpleGreeting extends LitElement {
  static styles = css`p { color: blue }`;

  @property()
  name?:string;

  @query('slot') _name?:string;
  
  render() {
    return html`<p>Hello, ${this.name}!</p>`;
  }
}
