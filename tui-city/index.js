
const template = document.createElement('template');
template.innerHTML = `
  <style>
    .container {
      padding: var(--main-padding, 18px);
      background: var(--background-color, black);
      color: var(--main-color, white);
    }
  </style>
  <li id="city"></li>
`;

class City extends HTMLElement {
  constructor() {
    super();
    this.shadowRoot = this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.element = this.shadowRoot.querySelector('#city');
  }

  attributeChangedCallback(name, _, data) {
    console.log('---- attributeChangedCallback', name, data);
    this.cityData = data;
    this.render();
  }
  
  static get observedAttributes() {
    console.log('---- observedAttributes');
    return ['city'];
  }

  set city(data) {
    console.log('---- set city');
    this.cityData = this.renderCities(data);
    this.render();
  }

  get city() {
    console.log('---- get city');
    return this.cityData;
  }

  render() {
    this.element.innerHTML = this.cityData;
  }
}
window.customElements.define('tui-city', City);