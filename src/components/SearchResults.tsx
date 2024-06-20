import { useContext } from "react"
import { PlacesContext } from "../context";
import { LoadingPlaces, SearchResultsList } from "./";


export const SearchResults = ()=>{
    const {places, isLoadingPlaces} = useContext(PlacesContext);


    return (isLoadingPlaces ? 
        <LoadingPlaces />
        :
        <SearchResultsList places={places} />
    )
}