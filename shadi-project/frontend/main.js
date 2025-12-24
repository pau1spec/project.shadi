const container = document.getElementById('countries');
const searchInput = document.getElementById('search');
const regionSelect = document.getElementById('region');
const toggleBtn = document.getElementById('viewToggle');

let countries = [];
let grid = true;

fetch('http://localhost:3000/countries')
  .then(r => r.json())
  .then(data => {
    countries = data;
    render();
  });

function render() {
  container.innerHTML = '';

  const text = searchInput.value.toLowerCase();
  const region = regionSelect.value;

  const filtered = countries.filter(c => {
    const byName = Object.values(c.translations)
      .some(t => t.common.toLowerCase().includes(text));

    const byRegion = !region || c.region === region;
    return byName && byRegion;
  });

  filtered.forEach(c => {
    const div = document.createElement('div');
    div.className = 'card';

    div.innerHTML = `
      <div class="flag">${c.flag}</div>
      <h3>${c.name}</h3>
      <p>Регион: ${c.region}</p>
      <p>Столица: ${c.capital}</p>
      <p>Население: ${c.population}</p>
      <a href="country.html?code=${c.code}">Подробнее</a>
    `;

    container.appendChild(div);
  });
}

searchInput.oninput = render;
regionSelect.onchange = render;

toggleBtn.onclick = () => {
  grid = !grid;
  container.className = grid ? 'grid' : 'table';
  toggleBtn.textContent = grid ? 'Сетка' : 'Таблица';
};
