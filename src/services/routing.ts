import { Coordinates, RouteMode, TollBooth } from '../types/trip';
import { detectTollsOnRoute, detectTollsOnRouteAsync } from './tollDetection';

export interface RouteResult {
  mode: RouteMode;
  distanceKm: number;
  durationMinutes: number;
  coordinates: [number, number][]; // [lng, lat]
  tollBooths: TollBooth[];
  error?: string;
}

/**
 * Helper to fetch a route from OSRM for a list of coordinates
 */
async function queryOSRM(coordsList: Coordinates[]): Promise<any> {
  const coordStr = coordsList.map((c) => `${c.lng},${c.lat}`).join(';');
  const url = `https://router.project-osrm.org/route/v1/driving/${coordStr}?overview=full&geometries=geojson&alternatives=3&steps=true`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Erro no serviço OSRM: ${response.statusText}`);
  }
  return response.json();
}

/**
 * Calculates bypass coordinates around a toll booth to divert around concession plazas
 */
function generateBypassWaypoints(
  boothCoords: Coordinates,
  origin: Coordinates,
  destination: Coordinates
): Coordinates[] {
  // Compute bearing / vector from origin to destination
  const dLat = destination.lat - origin.lat;
  const dLng = destination.lng - origin.lng;
  const len = Math.hypot(dLat, dLng) || 1;

  // Perpendicular unit vector
  const pLat = -dLng / len;
  const pLng = dLat / len;

  // Offset by ~8km (~0.075 degrees) to hit parallel municipal or state roads
  const offsetDegree = 0.075;

  return [
    {
      lat: Number((boothCoords.lat + pLat * offsetDegree).toFixed(6)),
      lng: Number((boothCoords.lng + pLng * offsetDegree).toFixed(6)),
    },
    {
      lat: Number((boothCoords.lat - pLat * offsetDegree).toFixed(6)),
      lng: Number((boothCoords.lng - pLng * offsetDegree).toFixed(6)),
    },
  ];
}

export async function fetchOSRMRoute(
  origin: Coordinates,
  destination: Coordinates,
  mode: RouteMode,
  vehicleMultiplier: number = 1.0
): Promise<RouteResult> {
  try {
    const data = await queryOSRM([origin, destination]);
    if (!data.routes || data.routes.length === 0) {
      throw new Error('Nenhuma rota encontrada entre os pontos especificados.');
    }

    let selectedRoute = data.routes[0];

    // If shortest mode is requested, pick the one with minimal distance
    if (mode === 'shortest' && data.routes.length > 1) {
      selectedRoute = data.routes.reduce((min: any, r: any) =>
        r.distance < min.distance ? r : min
      );
    }

    let detectedTolls = await detectTollsOnRouteAsync(
      selectedRoute.geometry.coordinates,
      vehicleMultiplier
    );

    // ==============================================================
    // AVOID TOLLS ENGINE: Find genuine alternate geometric paths
    // ==============================================================
    if (mode === 'avoid_tolls') {
      let bestAvoidRoute = selectedRoute;
      let minTollCount = detectedTolls.length;
      let bestTolls = detectedTolls;

      // 1. First check if any OSRM returned alternative already has 0 or fewer tolls
      if (data.routes.length > 1) {
        for (const altRoute of data.routes) {
          const altTolls = detectTollsOnRoute(altRoute.geometry.coordinates, vehicleMultiplier);
          if (altTolls.length < minTollCount) {
            minTollCount = altTolls.length;
            bestAvoidRoute = altRoute;
            bestTolls = altTolls;
          }
        }
      }

      // 2. If tolls are still present, attempt intelligent waypoint detour around toll plazas
      if (minTollCount > 0 && detectedTolls.length > 0) {
        // Take up to 2 major toll plazas to construct bypass waypoints
        const keyBooths = detectedTolls.slice(0, 2);
        for (const booth of keyBooths) {
          const bypassCandidates = generateBypassWaypoints(booth.coordinates, origin, destination);

          for (const bypassPt of bypassCandidates) {
            try {
              const detourData = await queryOSRM([origin, bypassPt, destination]);
              if (detourData.routes && detourData.routes.length > 0) {
                const detourRoute = detourData.routes[0];
                const detourTolls = detectTollsOnRoute(
                  detourRoute.geometry.coordinates,
                  vehicleMultiplier
                );

                // If detour route successfully avoids tolls and doesn't exceed 2x standard distance
                if (
                  detourTolls.length < minTollCount &&
                  detourRoute.distance < selectedRoute.distance * 1.8
                ) {
                  minTollCount = detourTolls.length;
                  bestAvoidRoute = detourRoute;
                  bestTolls = detourTolls;
                }
              }
            } catch {
              // Ignore single detour failure
            }
          }
        }
      }

      selectedRoute = bestAvoidRoute;
      detectedTolls = bestTolls;
    }

    const distanceKm = Number((selectedRoute.distance / 1000).toFixed(1));
    const durationMinutes = Math.round(selectedRoute.duration / 60);

    return {
      mode,
      distanceKm,
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

        return {
          mode,
          distanceKm: distKm,
          durationMinutes: durMin,
          coordinates: [
            [origin.lng, origin.lat],
            [destination.lng, destination.lat],
          ],
          tollBooths:
            mode === 'avoid_tolls'
              ? []
              : detectTollsOnRoute(
                  [
                    [origin.lng, origin.lat],
                    [destination.lng, destination.lat],
                  ],
                  vehicleMultiplier,
                  distKm
                ),
        };
      }
    } catch (e) {
      console.warn('Google route error, falling back to OSRM:', e);
    }
  }

  return fetchOSRMRoute(origin, destination, mode, vehicleMultiplier);
}
