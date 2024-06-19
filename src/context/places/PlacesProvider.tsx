import { useEffect, useReducer } from "react";
import { PlacesContext } from "./PlacesContext";
import { placesReducer } from "./placesReducer";
import { getUserLocation } from "../../helpers";


export interface PlacesState {
    isLoading: boolean;
    userLocation?: [number, number];
}

interface Props {
    children: JSX.Element | JSX.Element[];
}


const INITIAL_STATE:PlacesState = {
    isLoading: true,
    userLocation: undefined
}



/** Proveedor de estado: Es la información almacenada. */
export const PlacesProvider = ({children}:Props)=>{
    const [state, dispatch] = useReducer(placesReducer, INITIAL_STATE);

    useEffect(() => {
        // Obtiene la geolocalización del usuario al cargar el provider
        getUserLocation().then(longLat => dispatch({
            type: 'setUserLocation', 
            payload: longLat
        }));
    }, [])
    

    return (
        <PlacesContext.Provider value={{
            ...state,
        }}>
            {children}
        </PlacesContext.Provider>
    )
}