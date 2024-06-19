import { createContext } from "react";
import { Map } from "mapbox-gl";


interface MapContextProps {
    isMapReady: boolean;
    map?: Map;

    //* Métodos
    setMap: (map: Map) => void;
}


export const MapContext = createContext<MapContextProps>({} as MapContextProps);