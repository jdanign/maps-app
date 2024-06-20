import { Feature } from "../interfaces/places"


type Props = {
    places: Feature[]
}


export const SearchResultsList = ({places}:Props)=>{
    return (places.length ? 
        <ul className="list-group">
            {
                places.map(place => (
                    <li key={place.id} className="list-group-item list-group-item-action">
                        <h6 className="mb-1">{place.text_es}</h6>
                        <p className="text-muted mb-1" style={{fontSize:'12px'}}>
                            {place.place_name_es}
                        </p>
                        <button className="btn btn-outline-primary btn-sm btn-outline-color">
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