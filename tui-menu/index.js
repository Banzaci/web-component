
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
    <input type="text" id="search" />
    <button>Search</button>
  </div>
`;

class TuiMeny extends HTMLElement {
  constructor() {
    super();
    this.filter = {};

    this.cities = [
      { city: 'Stockholm', continent: 'europe', season: 'summer' },
      { city: 'New York', continent: 'north-america', season: 'winter' },
      { city: 'Berlin', continent: 'europe', season: 'winter'},
      { city: 'Tokyo', continent: 'asia', season: 'winter' },
    ];

    this.shadowRoot = this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.button = this.shadowRoot.querySelector('button');
    
    window.addEventListener('filter', ({ detail }) => {
      this.filterData(detail);
    });
    
    this.button.addEventListener('click', () => this.filterData(this.cities));
    
    this.filterData();
  }

  filterData(data){
    const current = { ...this.filter, ...data };
    const filterData = Object.keys(current).reduce((acc, key) => {
      if (current[key]) {
        acc = {
          [key]: current[key]
        }
      }
      return acc;
    }, {});

    this.filter = { ...this.filter, ...filterData };

    console.log(this.filter)

    const filtered = Object.entries(this.filter).reduce((acc, current) => {
      const [key, value] = current;
      const filtered = this.cities.reduce( (cities, city) => {
        if(city[key] === value) {
          cities = [...cities, city]
        }
        return cities;
      }, acc);
      acc = [...acc, ...filtered]
      return acc
    }, []);

    console.log(filtered)

    this.fetch(filtered);
  }

  fetch(data=this.cities) {
    setTimeout(() => {
      window.dispatchEvent(
        new CustomEvent('cities', {
          detail: data
        })
      );
    }, 200)
  }
}
window.customElements.define('tui-menu', TuiMeny);