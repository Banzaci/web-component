
const template = document.createElement('template');
template.innerHTML = `
  <style>
    .container {
      padding: var(--main-padding, 68px);
      background: var(--background-color, red);
      color: var(--main-color, blue);
    }
  </style>
  <div class="container">
    <button></button>
  </div>
`;

class TuiMeny extends HTMLElement {
  constructor() {
    super();
    this.shadowRoot = this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.button = this.shadowRoot.querySelector('button');
    this.button.innerHTML = 'Load cities';
    this.button.addEventListener('click', () => {
      window.dispatchEvent(
        new CustomEvent('cities', {
          detail: [
            'Stockholm',
            'New York',
            'Berlin',
            'Milan'
          ]
        })
      );
    });
  }
}
window.customElements.define('tui-menu', TuiMeny);