import { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';
import { Coordinates } from '../../types/trip';

interface MapControllerProps {
  origin?: Coordinates | null;
  destination?: Coordinates | null;
  coordinates?: [number, number][];
}

export function MapController({ origin, destination, coordinates }: MapControllerProps) {
  const map = useMap();

  useEffect(() => {
    if (coordinates && coordinates.length > 1) {
      // coordinates are [lng, lat]
      const bounds = L.latLngBounds(
        coordinates.map(([lng, lat]) => [lat, lng] as [number, number])
      );
      map.fitBounds(bounds, { padding: [50, 50], maxZoom: 15, animate: true });
    } else if (origin && destination) {
      const bounds = L.latLngBounds([
        [origin.lat, origin.lng],
        [destination.lat, destination.lng],
      ]);
      map.fitBounds(bounds, { padding: [60, 60], maxZoom: 14, animate: true });
    } else if (origin) {
      map.setView([origin.lat, origin.lng], 12, { animate: true });
    } else if (destination) {
      map.setView([destination.lat, destination.lng], 12, { animate: true });
    }
  }, [map, origin, destination, coordinates]);

  return null;
}
