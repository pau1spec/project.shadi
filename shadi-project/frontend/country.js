const params = new URLSearchParams(location.search);
const code = params.get('code');

fetch(`http://localhost:3000/countries/${code}`)
  .then(r => r.json())
  .then(c => {
    document.getElementById('info').innerHTML = `
      <h1>${c.flag} ${c.name.common}</h1>
      <p>Регион: ${c.region}</p>
      <p>Столица: ${c.capital?.[0] || '—'}</p>
      <p>Площадь: ${c.area}</p>
      <p>Население: ${c.population}</p>
    `;

    const [lat, lng] = c.latlng;
    document.getElementById('map').innerHTML = `
      <iframe
        src="https://maps.google.com/maps?q=${lat},${lng}&z=5&output=embed">
      </iframe>
    `;
  });
