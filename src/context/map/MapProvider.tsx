import { useContext, useEffect, useReducer } from "react";
import { AnyLayer, AnySourceData, LngLatBounds, Map, Marker, Popup } from "mapbox-gl";

import { MapContext } from "./MapContext";
import { mapReducer } from "./MapReducer";
import { PlacesContext } from "../places/PlacesContext";
import { directionsApi } from "../../apis";
import { DirectionsResponse } from "../../interfaces/directions";


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


    const getRouteBetweenPoints = async (start:[number, number], end:[number, number])=>{
        // Obtiene y procesa los datos de la ruta
        const resp = await directionsApi.get<DirectionsResponse>(`/${start.join(',')};${end.join(',')}`);
        const {distance, duration, geometry} = resp.data.routes[0];
        const kms = Math.round(distance / 1000 * 100) / 100;
        const minutes = Math.floor(duration / 60);

        console.log({distance, kms, minutes});

        // El mapa se coloca para mostrar el punto de origen y el de destino
        const bounds =  new LngLatBounds(start, start);
        for (const coord of geometry.coordinates) {
            const newCoord:[number, number] = [coord[0], coord[1]];
            bounds.extend(newCoord);
        }
        state.map?.fitBounds(bounds, {padding:50});

        // Establece la polilinea
        // Elimina la ruta si ya existe una previa
        if (state.map?.getLayer('RouteString')){
            state.map.removeSource('RouteString');
            state.map.removeLayer('RouteString');
        }
        // Dibuja la linea en el mapa
        state.map?.addSource('RouteString', {
            type: 'geojson',
            data: {
                type: 'FeatureCollection',
                features: [
                    {
                        type: 'Feature',
                        properties: {},
                        geometry: {
                            type: 'LineString',
                            coordinates: geometry.coordinates,
                        }
                    }
                ]
            }
        } as AnySourceData);
        state.map?.addLayer({
            id: 'RouteString',
            type: 'line',
            source: 'RouteString',
            layout: {
                'line-cap': 'round',
                'line-join': 'round',
            },
            paint: {
                'line-color': 'black',
                'line-width': 3,
            }
        } as AnyLayer);
    }
    

    return (
        <MapContext.Provider value={{
            ...state,
            
            //* Métodos
            setMap,
            getRouteBetweenPoints,
        }}>
            {children}
        </MapContext.Provider>
    )
}