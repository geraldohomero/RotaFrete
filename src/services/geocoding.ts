import { LocationPoint, Coordinates } from '../types/trip';

export async function searchAddresses(query: string, googleApiKey?: string): Promise<LocationPoint[]> {
  const trimmed = query.trim();
  if (!trimmed || trimmed.length < 3) return [];

  // If user provided a Google Maps API Key and wants Google Places
  if (googleApiKey) {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
          trimmed
        )}&components=country:BR&key=${googleApiKey}`
      );
      const data = await response.json();
      if (data.status === 'OK' && data.results) {
        return data.results.slice(0, 6).map((item: any) => ({
          address: item.formatted_address,
          coordinates: {
            lat: item.geometry.location.lat,
            lng: item.geometry.location.lng,
          },
        }));
      }
    } catch (err) {
      console.warn('Google Geocode failed, falling back to OpenStreetMap Nominatim:', err);
    }
  }

  // OpenStreetMap Nominatim (Free, no key needed)
  try {
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
      trimmed
    )}&countrycodes=br&limit=6&addressdetails=1`;

    const response = await fetch(url, {
      headers: {
        'Accept-Language': 'pt-BR,pt;q=0.9',
      },
    });

    if (!response.ok) {
      throw new Error(`Nominatim error: ${response.statusText}`);
    }

    const data = await response.json();

    return data.map((item: any) => {
      const city =
        item.address?.city ||
        item.address?.town ||
        item.address?.municipality ||
        item.address?.village ||
        item.address?.county ||
        '';
      const state = item.address?.state || '';

      // Format a clean readable label
      let formatted = item.display_name;
      if (city && state) {
        const road = item.address?.road || item.address?.suburb || '';
        formatted = road ? `${road}, ${city} - ${state}` : `${city} - ${state}, Brasil`;
      }

      return {
        address: formatted,
        city,
        state,
        coordinates: {
          lat: parseFloat(item.lat),
          lng: parseFloat(item.lon),
        },
      };
    });
  } catch (err) {
    console.error('Error searching address on Nominatim:', err);
    return [];
  }
}

export async function reverseGeocode(coords: Coordinates): Promise<string> {
  try {
    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${coords.lat}&lon=${coords.lng}&addressdetails=1`;
    const response = await fetch(url, {
      headers: {
        'Accept-Language': 'pt-BR,pt;q=0.9',
      },
    });
    if (!response.ok) return `${coords.lat.toFixed(4)}, ${coords.lng.toFixed(4)}`;
    const data = await response.json();
    return data.display_name || `${coords.lat.toFixed(4)}, ${coords.lng.toFixed(4)}`;
  } catch {
    return `${coords.lat.toFixed(4)}, ${coords.lng.toFixed(4)}`;
  }
}
