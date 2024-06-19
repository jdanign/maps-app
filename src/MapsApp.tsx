import { PlacesProvider } from "./context"
import { HomeScreen } from "./screens";

import 'mapbox-gl/dist/mapbox-gl.css';
import './css/styles.css';


function MapsApp() {
  return (
    <PlacesProvider>
      <HomeScreen />
    </PlacesProvider>
  )
}

export default MapsApp;