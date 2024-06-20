import { useContext, useEffect, useReducer } from "react";
import { Map, Marker, Popup } from "mapbox-gl";

import { MapContext } from "./MapContext";
import { mapReducer } from "./MapReducer";
import { PlacesContext } from "../places/PlacesContext";


export interface MapState {
    isMapReady: boolean;
    map?: Map;
    markers: Marker[],
}


const INITIAL_STATE:MapState = {
    isMapReady: false,
    map: undefined,
    markers: [],
}


type Props = {
    children: JSX.Element | JSX.Element[];
}


export const MapProvider = ({children}:Props)=>{
    const [state, dispatch] = useReducer(mapReducer, INITIAL_STATE);
    const {places} = useContext(PlacesContext);

    useEffect(() => {
        // Limpia los markers del mapa
        state.markers.forEach(marker => marker.remove());
        const newMarkers:Marker[] = [];
        for (const place of places) {
            const [lng, lat] = place.center;
            const popup = new Popup().setHTML(`
                <h6>${place.text}</h6>
                <p>${place.place_name_es}</p>
                `);
            const newMarker = new Marker()
            .setPopup(popup)
            .setLngLat([lng, lat])
            .addTo(state.map!);

            newMarkers.push(newMarker);
        }

        // Limpia los markers del estado
        dispatch({type:'setMarkers', payload:newMarkers})

        // TODO: Limpiar polyline
    }, [places])
    


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