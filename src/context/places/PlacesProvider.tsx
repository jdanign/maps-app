import { useReducer } from "react";
import { PlacesContext } from "./PlacesContext";
import { placesReducer } from "./placesReducer";

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

    return (
        <PlacesContext.Provider value={{
            ...state,
        }}>
            {children}
        </PlacesContext.Provider>
    )
}