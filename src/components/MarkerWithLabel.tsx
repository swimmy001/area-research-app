import { useRef, forwardRef, useEffect, useImperativeHandle } from 'react';
import type { Ref } from 'react';
import { useMap, useMapsLibrary } from '@vis.gl/react-google-maps';
import { MarkerWithLabel } from '@googlemaps/markerwithlabel';

type MarkerWithLabelProps = {
  icon?: {url: string},
  position: { lat: number, lng: number },
  clickable: boolean,
  draggable: boolean,
  map: google.maps.Map | null,
  labelContent: string,
  labelClass: string,
};

type MarkerRef = Ref<google.maps.Marker | null>;

export const MarkerWL = forwardRef<google.maps.Marker | null, MarkerWithLabelProps>((props, ref: MarkerRef) => {
  const mapsLibrary = useMapsLibrary("core");
  const marker = useRef<google.maps.Marker | null>(null);
  const map = useMap();

  console.log(props);

  useEffect(() => {
    if (!mapsLibrary) {
      return;
    }

    if (!marker.current) {
      marker.current = new MarkerWithLabel({
        ...props, 
        labelAnchor: new mapsLibrary.Point(-60, 0), 
        icon: {
          url: props.icon && props.icon.url ? props.icon.url : "default_icon_url",
          scaledSize: new mapsLibrary.Size(40, 40)
        }
      });
    }

    if (map && marker.current) {
      marker.current.setMap(map);
    }
  }, [mapsLibrary, map, props]);

  useImperativeHandle(ref, () => marker.current);

  return null;
});
