import { useRef, forwardRef, useEffect, useImperativeHandle } from 'react';
import type { Ref } from 'react';
import { useMap, useMapsLibrary } from '@vis.gl/react-google-maps';

type CircleProps = {
  center: { lat: number, lng: number },
  radius: number
  strokeColor: string,
  strokeOpacity: number,
  strokeWeight: number,
  fillColor: string,
  fillOpacity: number
};

type CircleRef = Ref<google.maps.Circle | null>;

export const Circle = forwardRef<google.maps.Circle | null, CircleProps>((props, ref: CircleRef) => {
  const mapsLibrary = useMapsLibrary("maps");
  const circle = useRef<google.maps.Circle | null>(null);
  const map = useMap();

  console.log(props);

  useEffect(() => {
    if (!mapsLibrary) {
      return;
    }

    if (!circle.current) {
      circle.current = new mapsLibrary.Circle({...props});
    }

    if (map) {
      circle.current.setMap(map);
    }
  }, [mapsLibrary, map, props]);

  useImperativeHandle(ref, () => circle.current);

  return null;
});
