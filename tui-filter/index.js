
const template = document.createElement('template');
template.innerHTML = `
<form name="continents">
  <ul>
    <li>
      <label>europe</label>
      <input type="radio" name="continents" value="europe" />
    </li>
    <li>
      <label>north america</label>
      <input type="radio" name="continents" value="north-america" />
    </li>
    <li>
      <label>asia</label>
      <input type="radio" name="continents" value="asia" />
    </li>
  </ul>
</form>
`;

class Filter extends HTMLElement {
  constructor() {
    super();
    this.shadowRoot = this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.element = this.shadowRoot.querySelector('ul');
    this.element.addEventListener('click', e => {
      window.dispatchEvent(
        new CustomEvent('filter', {
          detail: {
            continent: e.target.value
          }
        })
      );
    })
  }
}
window.customElements.define('tui-filter', Filter);