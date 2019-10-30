
const template = document.createElement('template');
template.innerHTML = `
<form name="season">
  <ul>
    <li>
      <label>summer</label>
      <input type="radio" name="season" value="summer" />
    </li>
    <li>
      <label>winter</label>
      <input type="radio" name="season" value="winter" />
    </li>
  </ul>
</form>
`;

class Season extends HTMLElement {
  constructor() {
    super();
    this.shadowRoot = this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.element = this.shadowRoot.querySelector('ul');
    // let arr = [];
    this.element.addEventListener('click', e => {
      // if (e.target.checked) {
      //   arr = [...arr, e.target.name]
      // } else {
      //   arr = [...arr.filter( c => c !== e.target.name)]
      // }
      window.dispatchEvent(
        new CustomEvent('filter', {
          detail: {
            season: e.target.value
          }
        })
      );
    })
  }
}
window.customElements.define('tui-season', Season);