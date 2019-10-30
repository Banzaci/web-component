
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

  renderCities(data) {
    return data.map( ({ city }) => `
        <li>
          <tui-city city="${city}"></tui-city>
        </li>
      `).join('');
  }

  attributeChangedCallback(_, __, data) {
    this.render(
      this.renderCities(data)
    );
  }

  render(cityData) {
    this.ul.innerHTML = cityData;
  }
}
window.customElements.define('tui-cities', Cities);