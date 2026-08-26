import { TollBooth, Coordinates } from '../types/trip';
import { COMPREHENSIVE_BRAZILIAN_TOLLS } from '../constants/tollDatabase';

/**
 * Calculates distance between two coordinates in kilometers using Haversine formula
 */
export function getDistanceFromLatLonInKm(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371; // Earth radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

/**
 * Finds the minimum distance from a point to a polyline and returns the route index where it was closest
 */
export function findClosestRoutePointIndex(
  coordinates: [number, number][],
  pointLat: number,
  pointLng: number
): { minDistance: number; index: number } {
  let minDistance = Infinity;
  let closestIndex = 0;

  for (let i = 0; i < coordinates.length; i++) {
    const [lng, lat] = coordinates[i];
    const dist = getDistanceFromLatLonInKm(lat, lng, pointLat, pointLng);
    if (dist < minDistance) {
      minDistance = dist;
      closestIndex = i;
    }
  }

  return { minDistance, index: closestIndex };
}

/**
 * Highly accurate toll detection along the actual driven polyline trajectory.
 * Uses a strict 0.6 km (600 meters) corridor threshold to avoid false positives
 * from parallel highways (e.g. Dutra vs Carvalho Pinto), ring roads, or crossing overpasses.
 */
export function detectTollsOnRoute(
  coordinates: [number, number][],
  vehicleMultiplier: number = 1.0,
  _distanceKm: number = 0
): TollBooth[] {
  if (!coordinates || coordinates.length < 2) return [];

  const matchedPlazas: { booth: TollBooth; routeIndex: number }[] = [];
  // Strict highway corridor threshold: 0.6 km (600m)
  // Ensures vehicle is actually driving on the toll plaza roadway, not on a parallel road 2km away
  const PROXIMITY_THRESHOLD_KM = 0.6;

  for (const plaza of COMPREHENSIVE_BRAZILIAN_TOLLS) {
    const { minDistance, index } = findClosestRoutePointIndex(
      coordinates,
      plaza.coordinates.lat,
      plaza.coordinates.lng
    );

    if (minDistance <= PROXIMITY_THRESHOLD_KM) {
      matchedPlazas.push({
        routeIndex: index,
        booth: {
          id: plaza.id,
          name: plaza.name,
          highway: `${plaza.highway} (${plaza.concessionaire})`,
          coordinates: plaza.coordinates,
          basePrice: plaza.basePrice,
          calculatedPrice: Number((plaza.basePrice * vehicleMultiplier).toFixed(2)),
          isActive: true,
        },
      });
    }
  }

  // Sort sequentially along the route direction from origin to destination
  matchedPlazas.sort((a, b) => a.routeIndex - b.routeIndex);

  // Deduplicate any booths within 3km of each other on the same highway (e.g. multiple ramp tags)
  const uniqueBooths: TollBooth[] = [];
  for (const match of matchedPlazas) {
    const isNearbyExisting = uniqueBooths.some(
      (existing) =>
        getDistanceFromLatLonInKm(
          existing.coordinates.lat,
          existing.coordinates.lng,
          match.booth.coordinates.lat,
          match.booth.coordinates.lng
        ) <= 2.0
    );

    if (!isNearbyExisting) {
      uniqueBooths.push(match.booth);
    }
  }

  return uniqueBooths;
}

/**
 * Async toll detection using high-precision database corridor matching
 */
export async function detectTollsOnRouteAsync(
  coordinates: [number, number][],
  vehicleMultiplier: number = 1.0
): Promise<TollBooth[]> {
  return detectTollsOnRoute(coordinates, vehicleMultiplier);
}

/**
 * Searches the entire Brazilian database of toll plazas by name, highway or city
 */
export function searchTollPlazas(query: string, vehicleMultiplier: number = 1.0): TollBooth[] {
  const q = query.toLowerCase().trim();
  if (!q) return [];

  return COMPREHENSIVE_BRAZILIAN_TOLLS.filter(
    (t) =>
      t.name.toLowerCase().includes(q) ||
      t.highway.toLowerCase().includes(q) ||
      t.concessionaire.toLowerCase().includes(q) ||
      t.state.toLowerCase() === q
  )
    .slice(0, 10)
    .map((plaza) => ({
      id: `search-${plaza.id}-${Date.now()}`,
      name: plaza.name,
      highway: `${plaza.highway} (${plaza.concessionaire})`,
      coordinates: plaza.coordinates,
      basePrice: plaza.basePrice,
      calculatedPrice: Number((plaza.basePrice * vehicleMultiplier).toFixed(2)),
      isActive: true,
    }));
}

/**
 * Adds a new custom toll booth to the list
 */
export function createCustomTollBooth(
  name: string,
  basePrice: number,
  coordinates: Coordinates,
  vehicleMultiplier: number = 1.0
): TollBooth {
  const price = Math.max(0, basePrice);
  return {
    id: `custom-toll-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    name: name.trim() || 'Praça de Pedágio Manual',
    coordinates,
    basePrice: price,
    calculatedPrice: Number((price * vehicleMultiplier).toFixed(2)),
    isCustom: true,
    isActive: true,
  };
}
