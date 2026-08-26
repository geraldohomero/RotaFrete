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
function findClosestRoutePointIndex(
  coordinates: [number, number][],
  pointLat: number,
  pointLng: number
): { minDistance: number; index: number } {
  let minDistance = Infinity;
  let closestIndex = 0;

  // Sample every few points if route is very dense for high performance
  const step = coordinates.length > 500 ? 2 : 1;

  for (let i = 0; i < coordinates.length; i += step) {
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
 * Identifies toll plazas along a route coordinate path from the comprehensive Brazilian database
 * and sorts them chronologically in the exact order the driver will cross them!
 */
export function detectTollsOnRoute(
  coordinates: [number, number][],
  vehicleMultiplier: number = 1.0,
  _distanceKm: number = 0
): TollBooth[] {
  if (!coordinates || coordinates.length < 2) return [];

  const matchedPlazas: { booth: TollBooth; routeIndex: number }[] = [];
  const PROXIMITY_THRESHOLD_KM = 3.0; // Toll plaza within 3.0km of route trajectory

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

  return matchedPlazas.map((m) => m.booth);
}

/**
 * Queries OpenStreetMap Overpass API for live toll booths & gantries
 */
export async function fetchTollsFromOverpass(
  coordinates: [number, number][],
  vehicleMultiplier: number = 1.0
): Promise<TollBooth[]> {
  if (!coordinates || coordinates.length < 2) return [];

  try {
    // Calculate bounding box
    let minLat = 90, maxLat = -90, minLng = 180, maxLng = -180;
    for (const [lng, lat] of coordinates) {
      if (lat < minLat) minLat = lat;
      if (lat > maxLat) maxLat = lat;
      if (lng < minLng) minLng = lng;
      if (lng > maxLng) maxLng = lng;
    }

    // Add padding (~2.5km)
    minLat -= 0.025;
    maxLat += 0.025;
    minLng -= 0.025;
    maxLng += 0.025;

    const overpassQuery = `[out:json][timeout:6];(node["barrier"="toll_booth"](${minLat},${minLng},${maxLat},${maxLng});node["highway"="toll_gantry"](${minLat},${minLng},${maxLat},${maxLng}););out body;`;
    
    // Fast Overpass endpoints
    const endpoints = [
      'https://overpass-api.de/api/interpreter',
      'https://overpass.kumi.systems/api/interpreter',
    ];

    let data: any = null;

    for (const endpoint of endpoints) {
      try {
        const response = await fetch(endpoint, {
          method: 'POST',
          body: `data=${encodeURIComponent(overpassQuery)}`,
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
          },
        });
        if (response.ok) {
          data = await response.json();
          break;
        }
      } catch {
        continue;
      }
    }

    if (!data || !data.elements || data.elements.length === 0) return [];

    const detected: TollBooth[] = [];
    const PROXIMITY_THRESHOLD_KM = 2.5;

    for (const node of data.elements) {
      const { minDistance } = findClosestRoutePointIndex(coordinates, node.lat, node.lon);

      if (minDistance <= PROXIMITY_THRESHOLD_KM) {
        // Match with known toll booth if available
        const matchedKnown = COMPREHENSIVE_BRAZILIAN_TOLLS.find(
          (k) => getDistanceFromLatLonInKm(k.coordinates.lat, k.coordinates.lng, node.lat, node.lon) <= 3.0
        );

        const basePrice = matchedKnown ? matchedKnown.basePrice : 8.50;
        const name = matchedKnown?.name || node.tags?.name || node.tags?.description || `Praça de Pedágio (OSM)`;
        const highway = matchedKnown ? `${matchedKnown.highway} (${matchedKnown.concessionaire})` : node.tags?.ref || node.tags?.['addr:street'] || 'Rodovia Concessionada';

        detected.push({
          id: `osm-toll-${node.id}`,
          name,
          highway,
          coordinates: { lat: node.lat, lng: node.lon },
          basePrice,
          calculatedPrice: Number((basePrice * vehicleMultiplier).toFixed(2)),
          isActive: true,
        });
      }
    }

    return detected;
  } catch (err) {
    console.warn('Overpass API skipped, using local database:', err);
    return [];
  }
}

/**
 * Async toll detection combining database + live Overpass query
 */
export async function detectTollsOnRouteAsync(
  coordinates: [number, number][],
  vehicleMultiplier: number = 1.0
): Promise<TollBooth[]> {
  const localBooths = detectTollsOnRoute(coordinates, vehicleMultiplier);

  try {
    const liveOsmBooths = await fetchTollsFromOverpass(coordinates, vehicleMultiplier);

    if (liveOsmBooths.length > 0) {
      const merged = [...localBooths];
      for (const osmBooth of liveOsmBooths) {
        const isDuplicate = merged.some(
          (m) =>
            getDistanceFromLatLonInKm(
              m.coordinates.lat,
              m.coordinates.lng,
              osmBooth.coordinates.lat,
              osmBooth.coordinates.lng
            ) <= 2.5
        );
        if (!isDuplicate) {
          merged.push(osmBooth);
        }
      }
      return merged;
    }
  } catch {}

  return localBooths;
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
