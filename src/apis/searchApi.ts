import axios from "axios";


const searchApi = axios.create({
    baseURL: 'https://api.mapbox.com/geocoding/v5/mapbox.places',
    params: {
        country: 'es',
        language: 'es',
        access_token: 'pk.eyJ1IjoiamRhbmlnbiIsImEiOiJjbHhsbW5xMGkwMW90MmxyeXU2Z2I3YW5rIn0.mAdDuexm_xKllVdWFoQZyQ',
    }
});


export default searchApi;