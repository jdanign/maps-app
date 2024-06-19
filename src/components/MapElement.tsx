import { useContext, useLayoutEffect, useRef } from "react";
import { Map } from "mapbox-gl";

import { MapContext, PlacesContext } from "../context";


export const MapElement = ()=>{
    const {isLoading, userLocation} = useContext(PlacesContext);
    const {setMap} = useContext(MapContext);
    
    const mapDiv = useRef<HTMLDivElement>(null);


    useLayoutEffect(() => {
      if (!isLoading){
        const map = new Map({
            container: mapDiv.current!,
            style: 'mapbox://styles/mapbox/streets-v12', // style URL
            center: userLocation, // starting position [lng, lat]
            zoom: 13, // starting zoom
        });

        setMap(map);
      }
    }, [isLoading])


    return (
        <div ref={mapDiv}
            style={{
                height: '100vh',
                left:0,
                position: 'fixed',
                top: 0,
                width: '100vw',
            }}
        >
            {userLocation?.join(',')}
        </div>
    )
}