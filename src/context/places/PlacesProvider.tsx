import { useEffect, useReducer } from "react";
import { PlacesContext } from "./PlacesContext";
import { placesReducer } from "./placesReducer";
import { getUserLocation } from "../../helpers";
import { searchApi } from "../../apis";
import { Feature, PlacesResponse } from "../../interfaces/places";


export interface PlacesState {
    isLoading: boolean;
    userLocation?: [number, number];
    isLoadingPlaces: boolean;
    places: Feature[];
}

interface Props {
    children: JSX.Element | JSX.Element[];
}


const INITIAL_STATE:PlacesState = {
    isLoading: true,
    userLocation: undefined,
    isLoadingPlaces: false,
    places: [],
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
    }, []);


    /**
     * Busca en la API de mapas por el parámetro introducido en el buscador.
     * Valida que el parámetro sea introducido correctamente.
     * Dispara la acción para poner el estado de cargando.
     * Tras una llamada a la API, dispara la acción de almacenar la respuesta en el estado.
     * @param query Término de búsqueda.
     * @returns Listado de resultados de búsqueda o 'undefined'.
     */
    const searchPlacesByTerm = async (query:string):Promise<Feature[] | undefined>=>{
        if (query.length === 0)
            console.log({query});
            // TODO: Limpiar state
        else if (!state.userLocation)
            throw new Error('No existe la ubicación del usuario');
        else{
            dispatch({type: 'setLoadingPlaces'});

            const resp = await searchApi.get<PlacesResponse>(`/${query}.json`, {
                params: {
                    proximity: state.userLocation.join(','),
                }
            });

            dispatch({type: 'setPlaces', payload: resp.data.features})

            return resp.data.features;
        } 
    }
    

    return (
        <PlacesContext.Provider value={{
            ...state,

            //* Methods
            searchPlacesByTerm,
        }}>
            {children}
        </PlacesContext.Provider>
    )
}