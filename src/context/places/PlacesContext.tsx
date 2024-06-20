import { createContext } from "react";
import { Feature } from "../../interfaces/places";


export interface PlacesContextProps {
    isLoading: boolean;
    userLocation?: [number, number];
    isLoadingPlaces: boolean;
    places: Feature[];

    //* Methods
    searchPlacesByTerm: (query: string) => Promise<Feature[] | undefined>;
}


/** Contexto: es lo que se muestra o expone a los otros componentes. */
export const PlacesContext = createContext<PlacesContextProps>({} as PlacesContextProps);
// Poniéndole el 'as PlacesContextProps' permite no tener que inicializar el objeto