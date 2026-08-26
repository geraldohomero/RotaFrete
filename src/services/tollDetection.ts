import { TollBooth, Coordinates } from '../types/trip';

// Brazilian major toll plazas with approximate coordinates and base car price (2024/2026 rates)
export const KNOWN_TOLL_BOOTHS: Omit<TollBooth, 'calculatedPrice' | 'isActive'>[] = [
  // BR-116 (Presidente Dutra - SP/RJ)
  { id: 'dutra-aruja', name: 'Pedágio Arujá (Dutra)', highway: 'BR-116 / Rod. Pres. Dutra', coordinates: { lat: -23.4072, lng: -46.3314 }, basePrice: 4.10 },
  { id: 'dutra-guararema', name: 'Pedágio Guararema (Dutra)', highway: 'BR-116 / Rod. Pres. Dutra', coordinates: { lat: -23.3618, lng: -46.0682 }, basePrice: 4.10 },
  { id: 'dutra-jacarei', name: 'Pedágio Jacareí (Dutra)', highway: 'BR-116 / Rod. Pres. Dutra', coordinates: { lat: -23.2842, lng: -45.9681 }, basePrice: 7.60 },
  { id: 'dutra-moreira-cesar', name: 'Pedágio Moreira César (Dutra)', highway: 'BR-116 / Rod. Pres. Dutra', coordinates: { lat: -22.9511, lng: -45.3612 }, basePrice: 16.50 },
  { id: 'dutra-itatiaia', name: 'Pedágio Itatiaia (Dutra)', highway: 'BR-116 / Rod. Pres. Dutra', coordinates: { lat: -22.5034, lng: -44.5714 }, basePrice: 16.50 },
  { id: 'dutra-viuva-graca', name: 'Pedágio Viúva Graça (Dutra)', highway: 'BR-116 / Rod. Pres. Dutra', coordinates: { lat: -22.7092, lng: -43.7198 }, basePrice: 16.50 },

  // Rodovia dos Bandeirantes (SP-348) & Anhanguera (SP-330)
  { id: 'band-caieiras', name: 'Pedágio Caieiras (Bandeirantes)', highway: 'SP-348 Rod. dos Bandeirantes', coordinates: { lat: -23.3592, lng: -46.7794 }, basePrice: 11.80 },
  { id: 'band-itupeva', name: 'Pedágio Itupeva (Bandeirantes)', highway: 'SP-348 Rod. dos Bandeirantes', coordinates: { lat: -23.1601, lng: -47.0543 }, basePrice: 11.80 },
  { id: 'band-sumare', name: 'Pedágio Sumaré (Bandeirantes)', highway: 'SP-348 Rod. dos Bandeirantes', coordinates: { lat: -22.8211, lng: -47.2514 }, basePrice: 10.90 },
  { id: 'band-limeira', name: 'Pedágio Limeira (Bandeirantes)', highway: 'SP-348 Rod. dos Bandeirantes', coordinates: { lat: -22.6105, lng: -47.4112 }, basePrice: 8.20 },
  { id: 'anh-perus', name: 'Pedágio Perus (Anhanguera)', highway: 'SP-330 Rod. Anhanguera', coordinates: { lat: -23.4112, lng: -46.7712 }, basePrice: 11.80 },
  { id: 'anh-valinhos', name: 'Pedágio Valinhos (Anhanguera)', highway: 'SP-330 Rod. Anhanguera', coordinates: { lat: -22.9912, lng: -47.0812 }, basePrice: 11.80 },
  { id: 'anh-americana', name: 'Pedágio Americana (Anhanguera)', highway: 'SP-330 Rod. Anhanguera', coordinates: { lat: -22.7112, lng: -47.3312 }, basePrice: 10.50 },

  // Rodovia Castelo Branco (SP-280)
  { id: 'castelo-osasco', name: 'Pedágio Osasco (Castelo Branco)', highway: 'SP-280 Rod. Castelo Branco', coordinates: { lat: -23.5182, lng: -46.7991 }, basePrice: 5.90 },
  { id: 'castelo-barueri', name: 'Pedágio Barueri (Castelo Branco)', highway: 'SP-280 Rod. Castelo Branco', coordinates: { lat: -23.5012, lng: -46.8812 }, basePrice: 5.90 },
  { id: 'castelo-itapevi', name: 'Pedágio Itapevi (Castelo Branco)', highway: 'SP-280 Rod. Castelo Branco', coordinates: { lat: -23.5211, lng: -46.9612 }, basePrice: 11.80 },
  { id: 'castelo-itu', name: 'Pedágio Itu (Castelo Branco)', highway: 'SP-280 Rod. Castelo Branco', coordinates: { lat: -23.4111, lng: -47.2412 }, basePrice: 14.80 },
  { id: 'castelo-boituva', name: 'Pedágio Boituva (Castelo Branco)', highway: 'SP-280 Rod. Castelo Branco', coordinates: { lat: -23.3211, lng: -47.6612 }, basePrice: 12.20 },

  // Rodovia Imigrantes (SP-160) / Anchieta (SP-150)
  { id: 'imigrantes-piratininga', name: 'Pedágio Piratininga (Imigrantes)', highway: 'SP-160 Rod. dos Imigrantes', coordinates: { lat: -23.7712, lng: -46.6012 }, basePrice: 36.80 },
  { id: 'anchieta-riacho-grande', name: 'Pedágio Riacho Grande (Anchieta)', highway: 'SP-150 Rod. Anchieta', coordinates: { lat: -23.7912, lng: -46.5412 }, basePrice: 36.80 },

  // Rodovia Fernão Dias (BR-381 - SP / MG)
  { id: 'fernao-mairipora', name: 'Pedágio Mairiporã (Fernão Dias)', highway: 'BR-381 Rod. Fernão Dias', coordinates: { lat: -23.3214, lng: -46.5912 }, basePrice: 3.20 },
  { id: 'fernao-vargem', name: 'Pedágio Vargem (Fernão Dias)', highway: 'BR-381 Rod. Fernão Dias', coordinates: { lat: -22.8912, lng: -46.4212 }, basePrice: 3.20 },
  { id: 'fernao-cambui', name: 'Pedágio Cambuí (Fernão Dias)', highway: 'BR-381 Rod. Fernão Dias', coordinates: { lat: -22.6112, lng: -46.0412 }, basePrice: 3.20 },
  { id: 'fernao-carmo', name: 'Pedágio Carmo da Cachoeira (Fernão Dias)', highway: 'BR-381 Rod. Fernão Dias', coordinates: { lat: -21.7112, lng: -45.1912 }, basePrice: 3.20 },
  { id: 'fernao-betim', name: 'Pedágio Betim (Fernão Dias)', highway: 'BR-381 Rod. Fernão Dias', coordinates: { lat: -20.0212, lng: -44.2012 }, basePrice: 3.20 },

  // Rodovia Régis Bittencourt (BR-116 - SP / PR)
  { id: 'regis-sao-lourenco', name: 'Pedágio São Lourenço da Serra', highway: 'BR-116 Régis Bittencourt', coordinates: { lat: -23.8512, lng: -46.9412 }, basePrice: 4.00 },
  { id: 'regis-miracatu', name: 'Pedágio Miracatu', highway: 'BR-116 Régis Bittencourt', coordinates: { lat: -24.2812, lng: -47.4612 }, basePrice: 4.00 },
  { id: 'regis-juquia', name: 'Pedágio Juquiá', highway: 'BR-116 Régis Bittencourt', coordinates: { lat: -24.4212, lng: -47.6612 }, basePrice: 4.00 },
  { id: 'regis-cajati', name: 'Pedágio Cajati', highway: 'BR-116 Régis Bittencourt', coordinates: { lat: -24.7312, lng: -48.1212 }, basePrice: 4.00 },
  { id: 'regis-barra-turvo', name: 'Pedágio Barra do Turvo', highway: 'BR-116 Régis Bittencourt', coordinates: { lat: -24.9812, lng: -48.5112 }, basePrice: 4.00 },
  { id: 'regis-campina-sul', name: 'Pedágio Campina Grande do Sul', highway: 'BR-116 Régis Bittencourt', coordinates: { lat: -25.2812, lng: -49.0712 }, basePrice: 4.00 },

  // Rodovia Ayrton Senna / Carvalho Pinto (SP-070)
  { id: 'senna-itqua', name: 'Pedágio Itaquaquecetuba (Ayrton Senna)', highway: 'SP-070 Rod. Ayrton Senna', coordinates: { lat: -23.4712, lng: -46.3512 }, basePrice: 5.40 },
  { id: 'senna-guararema', name: 'Pedágio Guararema (Carvalho Pinto)', highway: 'SP-070 Rod. Carvalho Pinto', coordinates: { lat: -23.3612, lng: -46.0312 }, basePrice: 4.80 },
  { id: 'senna-sjc', name: 'Pedágio São José dos Campos (Carvalho Pinto)', highway: 'SP-070 Rod. Carvalho Pinto', coordinates: { lat: -23.2612, lng: -45.8812 }, basePrice: 4.80 },
  { id: 'senna-cacapava', name: 'Pedágio Caçapava (Carvalho Pinto)', highway: 'SP-070 Rod. Carvalho Pinto', coordinates: { lat: -23.1312, lng: -45.7112 }, basePrice: 5.10 },

  // BR-101 (Rio - Santos / CCR RioSP / Autopista Litoral Sul)
  { id: 'br101-itaguai', name: 'Pedágio Itaguaí (BR-101)', highway: 'BR-101 Rio-Santos', coordinates: { lat: -22.8812, lng: -43.7812 }, basePrice: 5.20 },
  { id: 'br101-mangaratiba', name: 'Pedágio Mangaratiba (BR-101)', highway: 'BR-101 Rio-Santos', coordinates: { lat: -22.9612, lng: -44.0412 }, basePrice: 5.20 },
  { id: 'br101-paraty', name: 'Pedágio Paraty (BR-101)', highway: 'BR-101 Rio-Santos', coordinates: { lat: -23.2212, lng: -44.7212 }, basePrice: 5.20 },
  { id: 'br101-garuva', name: 'Pedágio Garuva (BR-101)', highway: 'BR-101 Litoral Sul', coordinates: { lat: -26.0312, lng: -48.8612 }, basePrice: 5.10 },
  { id: 'br101-araquari', name: 'Pedágio Araquari (BR-101)', highway: 'BR-101 Litoral Sul', coordinates: { lat: -26.3712, lng: -48.7212 }, basePrice: 5.10 },
  { id: 'br101-porto-belo', name: 'Pedágio Porto Belo (BR-101)', highway: 'BR-101 Litoral Sul', coordinates: { lat: -27.1612, lng: -48.5912 }, basePrice: 5.10 },
  { id: 'br101-palhoca', name: 'Pedágio Palhoça (BR-101)', highway: 'BR-101 Litoral Sul', coordinates: { lat: -27.6512, lng: -48.6712 }, basePrice: 5.10 },
];

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
 * Queries OpenStreetMap Overpass API (Free) for real-time toll booths and gantries along the route bbox
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

    // Add padding (~2km)
    minLat -= 0.02;
    maxLat += 0.02;
    minLng -= 0.02;
    maxLng += 0.02;

    const overpassQuery = `[out:json][timeout:8];(node["barrier"="toll_booth"](${minLat},${minLng},${maxLat},${maxLng});node["highway"="toll_gantry"](${minLat},${minLng},${maxLat},${maxLng}););out body;`;
    const response = await fetch('https://overpass-api.de/api/interpreter', {
      method: 'POST',
      body: `data=${encodeURIComponent(overpassQuery)}`,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      },
    });

    if (!response.ok) return [];

    const data = await response.json();
    if (!data.elements || data.elements.length === 0) return [];

    const detected: TollBooth[] = [];
    const PROXIMITY_THRESHOLD_KM = 2.0;

    for (const node of data.elements) {
      const isNearRoute = coordinates.some(([lng, lat]) => {
        const dist = getDistanceFromLatLonInKm(lat, lng, node.lat, node.lon);
        return dist <= PROXIMITY_THRESHOLD_KM;
      });

      if (isNearRoute) {
        // Match with known toll booth for exact price if available, or use average base rate of R$ 8.50
        const matchedKnown = KNOWN_TOLL_BOOTHS.find(
          (k) => getDistanceFromLatLonInKm(k.coordinates.lat, k.coordinates.lng, node.lat, node.lon) <= 3.0
        );

        const basePrice = matchedKnown ? matchedKnown.basePrice : 8.50;
        const name = matchedKnown?.name || node.tags?.name || node.tags?.description || `Praça de Pedágio (OSM)`;
        const highway = matchedKnown?.highway || node.tags?.['addr:street'] || node.tags?.ref || 'Rodovia Tarifada';

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
    console.warn('Overpass toll API query skipped, using localized database:', err);
    return [];
  }
}

/**
 * Identifies toll plazas along a route coordinate path (Combining Overpass API + Local Concessionaire DB)
 */
export function detectTollsOnRoute(
  coordinates: [number, number][],
  vehicleMultiplier: number = 1.0,
  _distanceKm: number = 0
): TollBooth[] {
  if (!coordinates || coordinates.length === 0) return [];

  const detectedBooths: TollBooth[] = [];
  const PROXIMITY_THRESHOLD_KM = 2.5;

  for (const booth of KNOWN_TOLL_BOOTHS) {
    const isNearRoute = coordinates.some(([lng, lat]) => {
      const dist = getDistanceFromLatLonInKm(lat, lng, booth.coordinates.lat, booth.coordinates.lng);
      return dist <= PROXIMITY_THRESHOLD_KM;
    });

    if (isNearRoute) {
      detectedBooths.push({
        id: booth.id,
        name: booth.name,
        highway: booth.highway,
        coordinates: booth.coordinates,
        basePrice: booth.basePrice,
        calculatedPrice: Number((booth.basePrice * vehicleMultiplier).toFixed(2)),
        isActive: true,
      });
    }
  }

  return detectedBooths;
}

/**
 * Async toll detection combining live Overpass API query and known concessionaires
 */
export async function detectTollsOnRouteAsync(
  coordinates: [number, number][],
  vehicleMultiplier: number = 1.0
): Promise<TollBooth[]> {
  const localBooths = detectTollsOnRoute(coordinates, vehicleMultiplier);

  try {
    const liveOsmBooths = await fetchTollsFromOverpass(coordinates, vehicleMultiplier);

    // Merge live OSM tolls with local database avoiding duplicates
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
