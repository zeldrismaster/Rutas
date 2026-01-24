// Límites de Maracaibo
const limitesMaracaibo = [
  [10.55, -71.75],
  [10.80, -71.50]
];

// Crear mapa
const map = L.map('map', {
  maxBounds: limitesMaracaibo,
  maxBoundsViscosity: 1.0,
  minZoom: 12,
  maxZoom: 18
}).setView([10.67, -71.61], 13);

// Mapa base
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap'
}).addTo(map);

// Cargar ruta 18 de Octubre
fetch('data/rutas/18-octubre.json')
  .then(response => response.json())
  .then(ruta => {

    // Ruta principal
    const principal = ruta.ruta_principal.map(p => [p.lat, p.lng]);

    const lineaPrincipal = L.polyline(principal, {
      className: 'ruta-principal'
    }).addTo(map);

    // Rutas secundarias
    if (ruta.rutas_secundarias) {
      Object.values(ruta.rutas_secundarias).forEach(sec => {
        const coords = sec.map(p => [p.lat, p.lng]);
        L.polyline(coords, {
          className: 'ruta-secundaria'
        }).addTo(map);
      });
    }

    map.fitBounds(lineaPrincipal.getBounds());
  })
  .catch(error => {
    console.error('Error cargando la ruta:', error);
  });
