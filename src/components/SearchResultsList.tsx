import { useContext, useState } from "react"
import { Feature } from "../interfaces/places"
import { MapContext, PlacesContext } from "../context"


type Props = {
    places: Feature[]
}


export const SearchResultsList = ({places}:Props)=>{
    const {userLocation} = useContext(PlacesContext);
    const {map, getRouteBetweenPoints} = useContext(MapContext);

    const [activeId, setActiveId] = useState('');


    /** Establece la funcionalidad para que el mapa se traslade al lugar de la lista clicado. */
    const onPlaceClicked = (place:Feature)=>{
        const [lng, lat] = place.center;

        setActiveId(place.id);

        map?.flyTo({
            zoom: 14,
            center: [lng, lat]
        })
    }


    const getRoute = (place:Feature)=>{
        if (userLocation){
            const [lng, lat] = place.center;

            getRouteBetweenPoints(userLocation, [lng, lat]);
        }
    }


    return (places.length ? 
        <ul className="list-group">
            {
                places.map(place => (
                    <li 
                        key={place.id} 
                        onClick={()=> onPlaceClicked(place)}
                        className={`list-group-item list-group-item-light pointer ${activeId === place.id ? 'active' : ''}`}
                    >
                        <h6 className="mb-1">{place.text_es}</h6>
                        <p className={`${activeId === place.id ? 'text-light' : 'text-muted'} mb-1`} style={{fontSize:'12px'}}>
                            {place.place_name_es}
                        </p>
                        <button 
                            onClick={()=> getRoute(place)}
                            className={`btn btn-sm ${activeId === place.id ? 'btn-outline-light' : 'btn-outline-primary btn-outline-color'}`}
                        >
                            Direcciones
                        </button>
                    </li>
                ))
            }
            
        </ul>
        :
        <></>
    )
}