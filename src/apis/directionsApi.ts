import axios from "axios";


const directionsApi = axios.create({
    baseURL: 'https://api.mapbox.com/directions/v5/mapbox/driving',
    params: {
        alternatives: false,
        geometries: 'geojson',
        overview: 'simplified',
        steps: false,
        access_token: 'pk.eyJ1IjoiamRhbmlnbiIsImEiOiJjbHhsbW5xMGkwMW90MmxyeXU2Z2I3YW5rIn0.mAdDuexm_xKllVdWFoQZyQ',
    }
});


export default directionsApi;