import { PlacesState } from "./PlacesProvider";


type PlacesAction = {
    type: 'setUserLocation', 
    payload: [number, number],
};


/** Reducer de las acciones disponibles. */
export const placesReducer = (state:PlacesState, action:PlacesAction):PlacesState=>{
    switch (action.type){
        case 'setUserLocation':
            return {
                ...state,
                isLoading: false,
                userLocation: action.payload,
            }
        default:
            return state;
    }
};