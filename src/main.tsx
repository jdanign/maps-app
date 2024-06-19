import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './MapsApp.tsx'


// Mensaje de error en caso de que no se pueda usar la geolocalización
if (!navigator.geolocation){
  const msgError = 'Tu navegador no tiene opción de geolocalización.'
  alert(msgError);
  throw new Error (msgError);
}

import mapboxgl from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"

mapboxgl.accessToken = 'pk.eyJ1IjoiamRhbmlnbiIsImEiOiJjbHhsbW5xMGkwMW90MmxyeXU2Z2I3YW5rIn0.mAdDuexm_xKllVdWFoQZyQ';



ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)