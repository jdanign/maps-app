import { createContext } from "react";


export interface PlacesContextProps {
    isLoading: boolean;
    userLocation?: [number, number];
}


/** Contexto: es lo que se muestra o expone a los otros componentes. */
export const PlacesContext = createContext<PlacesContextProps>({} as PlacesContextProps);
// Poniéndole el 'as PlacesContextProps' permite no tener que inicializar el objeto