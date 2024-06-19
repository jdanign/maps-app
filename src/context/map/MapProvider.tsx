import { useReducer } from "react";
import { Map, Marker, Popup } from "mapbox-gl";

import { MapContext } from "./MapContext";
import { mapReducer } from "./MapReducer";


export interface MapState {
    isMapReady: boolean;
    map?: Map;
}

interface Props {
    children: JSX.Element | JSX.Element[];
}


const INITIAL_STATE:MapState = {
    isMapReady: false,
    map: undefined
}


export const MapProvider = ({children}:Props)=>{
    const [state, dispatch] = useReducer(mapReducer, INITIAL_STATE);


    /** Establece el mapa recibido en el contexto. */
    const setMap = (map:Map)=>{
        // Establece un popup 
        const myLocationPopup = new Popup()
        .setHTML(`
            <h4>Aquí estoy</h4>
            <p>En algún lugar del mundo</p>
        `);

        // Establece el marcador en el punto central del mapa
        new Marker({
            color: '#61DAFB',
        })
        .setLngLat(map.getCenter())
        .setPopup(myLocationPopup)
        .addTo(map);

        dispatch({
            type: 'setMap', 
            payload: map
        });
    }
    

    return (
        <MapContext.Provider value={{
            ...state,
            
            //* Métodos
            setMap,
        }}>
            {children}
        </MapContext.Provider>
    )
}