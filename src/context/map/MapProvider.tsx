import { useReducer } from "react";
import { Map } from "mapbox-gl";

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


    const setMap = (map:Map)=>{
        dispatch({
            type:'setMap', 
            payload:map
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