import { APIProvider, Map } from '@vis.gl/react-google-maps';
import { MappingProps } from '../types/types';
import { Circle } from './Circle';

function Mapping({schools}: MappingProps) {
  return (
    <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
      <Map
        style={{width: 'auto', height: '100vh'}}
        defaultCenter={{lat: schools[0].base_lat, lng: schools[0].base_lng}}
        defaultZoom={14}
        disableDefaultUI={false}
        reuseMaps={true}
      >
        <Circle 
          center={{lat: schools[0].base_lat, lng: schools[0].base_lng}} 
          radius={schools[0].radius * 500}
          strokeColor='#FF0000'
          strokeOpacity={0.8}
          strokeWeight={2}
          fillColor='#FF0000'
          fillOpacity={0.1}
        />
        <Circle 
          center={{lat: schools[0].base_lat, lng: schools[0].base_lng}} 
          radius={schools[0].radius * 1000}
          strokeColor='#3333ff'
          strokeOpacity={0.8}
          strokeWeight={2}
          fillColor='#3333ff'
          fillOpacity={0.1}
        />
      </Map>
    </APIProvider>
  );
}

export default Mapping;
