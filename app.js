
const template = document.createElement('template');
template.innerHTML = `
  <style>
    .container {
      padding: var(--main-padding, 18px);
      background: var(--background-color, red);
      color: var(--main-color, red);
    }
  </style>
  <div class="container">
    <button>${this.label}</button>
  </div>
  `;
class WebComponent extends HTMLElement {
  constructor() {
    super();
    this.shadowRoot = this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.button = this.shadowRoot.querySelector('button');
    this.button.addEventListener('click', () => {
      this.dispatchEvent(
        new CustomEvent('onClick', {
          detail: 'Hello from within the Custom Element',
        })
      );
    });
  }

  set label(value) {
    this.setAttribute('label', value);
  }

  get label() {
    return this.getAttribute('label');
  }

  static get observedAttributes() {
    return ['label'];
  }

  attributeChangedCallback() {
    this.render();
  }

  render() {
    this.button.innerHTML = this.label;
  }
}
window.customElements.define('web-component', WebComponent);