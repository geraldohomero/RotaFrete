import { describe, it, expect } from 'vitest';
import {
  detectTollsOnRoute,
  createCustomTollBooth,
  getDistanceFromLatLonInKm,
  searchTollPlazas,
} from './tollDetection';

describe('Toll Detection Service', () => {
  it('calculates Haversine distance correctly', () => {
    const dist = getDistanceFromLatLonInKm(-23.5505, -46.6333, -22.9068, -43.1729);
    expect(dist).toBeGreaterThan(350);
    expect(dist).toBeLessThan(370);
  });

  it('detects toll booths along route coordinates and applies vehicle multipliers', () => {
    // Route passing near Arujá (-23.4072, -46.3314) and Guararema (-23.3618, -46.0682)
    const mockRouteCoordinates: [number, number][] = [
      [-46.6333, -23.5505], // SP
      [-46.3314, -23.4072], // Near Arujá
      [-46.0682, -23.3618], // Near Guararema
      [-43.1729, -22.9068], // RJ
    ];

    const detectedCar = detectTollsOnRoute(mockRouteCoordinates, 1.0);
    expect(detectedCar.length).toBeGreaterThanOrEqual(2);

    const aruja = detectedCar.find((b) => b.id.includes('dutra-aruja'));
    expect(aruja).toBeDefined();
    expect(aruja?.calculatedPrice).toBe(4.10);

    // With 3-axle truck multiplier (3.0x)
    const detectedTruck = detectTollsOnRoute(mockRouteCoordinates, 3.0);
    const arujaTruck = detectedTruck.find((b) => b.id.includes('dutra-aruja'));
    expect(arujaTruck?.calculatedPrice).toBe(12.30); // 4.10 * 3
  });

  it('searches toll plazas across national database', () => {
    const results = searchTollPlazas('Bandeirantes', 1.0);
    expect(results.length).toBeGreaterThan(0);
    expect(results[0].name).toContain('Bandeirantes');
  });

  it('creates custom toll booths with accurate multipliers', () => {
    const custom = createCustomTollBooth('Pedágio Extra SP', 15.50, { lat: -23.5, lng: -46.6 }, 2.0);
    expect(custom.name).toBe('Pedágio Extra SP');
    expect(custom.basePrice).toBe(15.50);
    expect(custom.calculatedPrice).toBe(31.00);
    expect(custom.isCustom).toBe(true);
    expect(custom.isActive).toBe(true);
  });
});
