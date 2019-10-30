
const template = document.createElement('template');
template.innerHTML = `
  <style>
    .container {
      padding: var(--main-padding, 18px);
      background: var(--background-color, black);
      color: var(--main-color, white);
    }
  </style>
  <p id="city"></p>
`;

class City extends HTMLElement {
  constructor() {
    super();
    this.shadowRoot = this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.element = this.shadowRoot.querySelector('#city');
  }

  attributeChangedCallback(name, _, data) {
    this.cityData = data;
    this.render();
  }
  
  static get observedAttributes() {
    return ['city'];
  }

  render() {
    this.element.innerHTML = this.cityData;
  }
}
window.customElements.define('tui-city', City);