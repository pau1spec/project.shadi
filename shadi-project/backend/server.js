const http = require('http');
const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, 'countries.json');
const countries = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

function getShortCountry(c) {
  return {
    name: c.name.common,
    code: c.cca3,
    region: c.region,
    capital: c.capital ? c.capital[0] : '—',
    area: c.area,
    population: c.population,
    flag: c.flag,
    translations: c.translations
  };
}

const server = http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'application/json');

  if (req.url === '/countries' && req.method === 'GET') {
    res.end(JSON.stringify(countries.map(getShortCountry)));
    return;
  }

  if (req.url.startsWith('/countries/') && req.method === 'GET') {
    const code = req.url.split('/')[2];
    const country = countries.find(c => c.cca3 === code);

    if (!country) {
      res.statusCode = 404;
      res.end(JSON.stringify({ error: 'Not found' }));
      return;
    }

    res.end(JSON.stringify(country));
    return;
  }

  res.statusCode = 404;
  res.end(JSON.stringify({ error: 'Route not found' }));
});

server.listen(3000, () => {
  console.log('Server started on http://localhost:3000');
});
