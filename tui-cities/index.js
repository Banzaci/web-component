
const template = document.createElement('template');
template.innerHTML = `
  <style>
    .container {
      padding: var(--main-padding, 18px);
      background: var(--background-color, black);
      color: var(--main-color, white);
    }
  </style>
  <div class="container">
    <ul id="cities"></ul>
  </div>
`;

class Cities extends HTMLElement {
  constructor() {
    super();
    this.shadowRoot = this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.ul = this.shadowRoot.querySelector('#cities');
    this.cityData = []
  }

  connectedCallback() {
    window.addEventListener('cities', ({ detail }) => {
      this.cityData = this.renderCities(detail);
      this.render();
    });
  }

  getCitiesAsList(data) {
    return (typeof data === 'string') ? JSON.parse(data) : data;
  }

  renderCities(data) {
    console.log('---- renderCities', data);
    return this.getCitiesAsList(data).map( city => `<tui-city city="${city}"></tui-city>`).join('');
  }

  attributeChangedCallback(name, _, data) {
    console.log('---- attributeChangedCallback', name);
    this.cityData = this.renderCities(data);
    this.render();
  }
  
  static get observedAttributes() {
    console.log('---- observedAttributes');
    return ['cities'];
  }

  set cities(data) {
    console.log('---- set cities');
    this.cityData = this.renderCities(data);
    this.render();
  }

  get cities() {
    console.log('---- get cities');
    return this.cityData;
  }

  render() {
    this.ul.innerHTML = this.cityData;
  }
}
window.customElements.define('tui-cities', Cities);