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
              [-46.329358, -23.403266],
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

  it('selects alternative route with zero tolls when avoid_tolls is chosen', async () => {
    const mockOSRMResponseWithAlternatives = {
      routes: [
        {
          // Route 1 (Fastest highway with toll)
          distance: 100000,
          duration: 3600,
          geometry: {
            coordinates: [
              [-46.6333, -23.5505],
              [-46.329358, -23.403266], // Toll Arujá
              [-46.1000, -23.3000],
            ],
          },
        },
        {
          // Route 2 (Secondary road avoiding toll)
          distance: 112000,
          duration: 4500,
          geometry: {
            coordinates: [
              [-46.6333, -23.5505],
              [-46.4500, -23.4800], // Free secondary road
              [-46.1000, -23.3000],
            ],
          },
        },
      ],
    };

    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => mockOSRMResponseWithAlternatives,
    });

    const result = await fetchOSRMRoute(
      { lat: -23.5505, lng: -46.6333 },
      { lat: -23.3000, lng: -46.1000 },
      'avoid_tolls',
      1.0
    );

    expect(result.mode).toBe('avoid_tolls');
    expect(result.distanceKm).toBe(112); // Selected the longer detour without tolls
    expect(result.tollBooths.length).toBe(0);
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
