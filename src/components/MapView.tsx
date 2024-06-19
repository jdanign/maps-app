import { useContext } from "react"
import { PlacesContext } from "../context"
import { Loading, MapElement } from "./";


export const MapView = ()=>{
    const {isLoading} = useContext(PlacesContext);
    

    return ((isLoading) ? 
        <Loading />
        : 
        <MapElement />
    )
}