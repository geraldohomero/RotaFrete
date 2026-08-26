import { Coordinates, RouteMode, TollBooth } from '../types/trip';
import { detectTollsOnRoute } from './tollDetection';

export interface RouteResult {
  mode: RouteMode;
  distanceKm: number;
  durationMinutes: number;
  coordinates: [number, number][]; // [lng, lat]
  tollBooths: TollBooth[];
  error?: string;
}

export async function fetchOSRMRoute(
  origin: Coordinates,
  destination: Coordinates,
  mode: RouteMode,
  vehicleMultiplier: number = 1.0
): Promise<RouteResult> {
  try {
    // OSRM coordinates format: {lon},{lat};{lon},{lat}
    const originStr = `${origin.lng},${origin.lat}`;
    const destStr = `${destination.lng},${destination.lat}`;

    let url = `https://router.project-osrm.org/route/v1/driving/${originStr};${destStr}?overview=full&geometries=geojson&alternatives=true&steps=true`;

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Erro no serviço OSRM: ${response.statusText}`);
    }

    const data = await response.json();
    if (!data.routes || data.routes.length === 0) {
      throw new Error('Nenhuma rota encontrada entre os pontos especificados.');
    }

    let selectedRoute = data.routes[0];

    // If shortest mode is requested and multiple routes returned, pick the one with minimal distance
    if (mode === 'shortest' && data.routes.length > 1) {
      selectedRoute = data.routes.reduce((min: any, r: any) =>
        r.distance < min.distance ? r : min
      );
    }

    const distanceKm = Number((selectedRoute.distance / 1000).toFixed(1));
    const durationMinutes = Math.round(selectedRoute.duration / 60);
    const coordinates: [number, number][] = selectedRoute.geometry.coordinates;

    // Detect toll plazas along the route
    let detectedTolls = detectTollsOnRoute(coordinates, vehicleMultiplier, distanceKm);

    // If 'avoid_tolls' mode is selected:
    if (mode === 'avoid_tolls') {
      // If there's an alternative route with fewer or zero tolls, choose it
      if (data.routes.length > 1) {
        let bestNoTollRoute = selectedRoute;
        let minTolls = detectedTolls.length;

        for (const altRoute of data.routes) {
          const altTolls = detectTollsOnRoute(altRoute.geometry.coordinates, vehicleMultiplier);
          if (altTolls.length < minTolls) {
            minTolls = altTolls.length;
            bestNoTollRoute = altRoute;
            detectedTolls = altTolls;
          }
        }
        selectedRoute = bestNoTollRoute;
      }

      // If user specifically requested avoiding tolls, mark any remaining detected tolls as inactive by default
      if (detectedTolls.length > 0) {
        detectedTolls = detectedTolls.map((t) => ({ ...t, isActive: false }));
      }
    }

    return {
      mode,
      distanceKm: Number((selectedRoute.distance / 1000).toFixed(1)),
      durationMinutes,
      coordinates: selectedRoute.geometry.coordinates,
      tollBooths: detectedTolls,
    };
  } catch (err: any) {
    console.error('Routing calculation error:', err);
    return {
      mode,
      distanceKm: 0,
      durationMinutes: 0,
      coordinates: [],
      tollBooths: [],
      error: err.message || 'Erro ao calcular a rota.',
    };
  }
}

/**
 * Calculates Google Maps Route if user provided a key, otherwise uses OSRM
 */
export async function calculateRoute(
  origin: Coordinates,
  destination: Coordinates,
  mode: RouteMode,
  vehicleMultiplier: number = 1.0,
  googleApiKey?: string
): Promise<RouteResult> {
  if (googleApiKey) {
    try {
      const avoidParam = mode === 'avoid_tolls' ? '&avoid=tolls' : '';
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/directions/json?origin=${origin.lat},${origin.lng}&destination=${destination.lat},${destination.lng}${avoidParam}&key=${googleApiKey}`
      );
      const data = await response.json();
      if (data.status === 'OK' && data.routes?.length > 0) {
        const leg = data.routes[0].legs[0];
        const distKm = Number((leg.distance.value / 1000).toFixed(1));
        const durMin = Math.round(leg.duration.value / 60);

        // Decode google overview polyline to lat/lng pairs
        // For simplicity fallback to OSRM coordinates or direct points
        return {
          mode,
          distanceKm: distKm,
          durationMinutes: durMin,
          coordinates: [
            [origin.lng, origin.lat],
            [destination.lng, destination.lat],
          ],
          tollBooths: mode === 'avoid_tolls' ? [] : detectTollsOnRoute([[origin.lng, origin.lat], [destination.lng, destination.lat]], vehicleMultiplier, distKm),
        };
      }
    } catch (e) {
      console.warn('Google route error, falling back to OSRM:', e);
    }
  }

  return fetchOSRMRoute(origin, destination, mode, vehicleMultiplier);
}
