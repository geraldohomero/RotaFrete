import { describe, it, expect, vi, beforeEach } from 'vitest';
import { fetchOSRMRoute, calculateRoute } from './routing';

describe('Routing Service', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('fetches and parses OSRM route correctly', async () => {
    const mockOSRMResponse = {
      routes: [
        {
          distance: 430000, // 430 km in meters
          duration: 18000, // 5 hours in seconds
          geometry: {
            coordinates: [
              [-46.6333, -23.5505],
              [-46.3314, -23.4072],
              [-43.1729, -22.9068],
            ],
          },
        },
      ],
    };

    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => mockOSRMResponse,
    });

    const result = await calculateRoute(
      { lat: -23.5505, lng: -46.6333 },
      { lat: -22.9068, lng: -43.1729 },
      'fastest',
      1.0
    );

    expect(result.distanceKm).toBe(430);
    expect(result.durationMinutes).toBe(300);
    expect(result.coordinates.length).toBe(3);
    expect(result.tollBooths.length).toBeGreaterThanOrEqual(1);
  });

  it('handles routing errors gracefully', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      statusText: 'Service Unavailable',
    });

    const result = await fetchOSRMRoute(
      { lat: 0, lng: 0 },
      { lat: 0, lng: 0 },
      'fastest'
    );

    expect(result.distanceKm).toBe(0);
    expect(result.error).toBeDefined();
  });
});
