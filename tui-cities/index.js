
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
    window.addEventListener('cities', ({ detail }) => {
      this.render(
        this.renderCities(detail)
      );
    });
  }

  getCitiesAsList(data) {
    return (typeof data === 'string') ? JSON.parse(data) : data;
  }

  renderCities(data) {
    return this.getCitiesAsList(data).map( city => `
        <li>
          <tui-city city="${city}"></tui-city>
        </li>
      `).join('');
  }

  attributeChangedCallback(name, _, data) {
    this.render(
      this.renderCities(data)
    );
  }
  
  static get observedAttributes() {
    return ['cities'];
  }

  render(cityData) {
    this.ul.innerHTML = cityData;
  }
}
window.customElements.define('tui-cities', Cities);