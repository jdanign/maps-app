import { useContext } from "react"
import { MapContext, PlacesContext } from "../context"


export const BtnMyLocation = ()=>{
    const {userLocation} = useContext(PlacesContext);
    const {map, isMapReady} = useContext(MapContext);


    const onClick = ()=>{
        if (!isMapReady)
            throw new Error('El mapa no está listo');
        else if (!userLocation)
            throw new Error('La ubicación del usuario no existe ');
        else
            map?.flyTo({
                zoom: 14,
                center: userLocation
            })
    }


    return (
        <button 
            onClick={onClick}
            className="btn btn-primary btn-bg-color floating-elements"
            style={{
                position: 'fixed',
                top: '20px',
                right: '20px',
                zIndex: 999,
            }}
        >
            Mi ubicación
        </button>
    )
}