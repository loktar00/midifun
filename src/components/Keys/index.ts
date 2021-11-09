import {LitElement, html} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('key-element')
class KeyElement extends LitElement {
  @property({type: String})
  public value: string = '';

  @property({type: Boolean})
  public isPressed: boolean = false;

  private _handleClick() {
    this.isPressed = !this.isPressed;
    console.log(this.isPressed);
  }

  render() {
      return html`
        <button @click="${this._handleClick}>
          Key: ${this.value}
        </button>
      `;
  }
}