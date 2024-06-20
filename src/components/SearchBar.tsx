import { ChangeEvent, useContext, useRef } from "react"

import { PlacesContext } from "../context";
import { SearchResults } from "./";


export const SearchBar = ()=>{
    const {searchPlacesByTerm} = useContext(PlacesContext);
    const debounceRef = useRef<ReturnType<typeof setTimeout>>();


    /** Establece un  */
    const onQueryChanged = (event:ChangeEvent<HTMLInputElement>)=>{
        if (debounceRef.current)
            clearTimeout(debounceRef.current);

        debounceRef.current = setTimeout(() => {
            searchPlacesByTerm(event.target.value);
        }, 1000);
    }


    return (
        <div className="bg-transparent search-container floating-elements">
            <input 
                type="text" 
                onChange={onQueryChanged}
                className="form-control mb-2"
                placeholder="Buscar un lugar..."
            />
            <SearchResults />
        </div>
    )
}