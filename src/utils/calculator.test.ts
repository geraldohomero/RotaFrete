import { describe, it, expect } from 'vitest';
import {
  calculateTripCosts,
  formatCurrency,
  formatDistance,
  formatDuration,
  updateTollBoothsWithMultiplier,
} from './calculator';
import { VEHICLE_PRESETS } from '../constants/vehicles';
import { TollBooth, ExtraExpenses } from '../types/trip';

describe('Trip Calculator Engine', () => {
  const mockTollBooths: TollBooth[] = [
    {
      id: 'toll-1',
      name: 'Pedágio Km 50',
      coordinates: { lat: -23.5, lng: -46.6 },
      basePrice: 10.0,
      calculatedPrice: 10.0,
      isActive: true,
    },
    {
      id: 'toll-2',
      name: 'Pedágio Km 120',
      coordinates: { lat: -23.8, lng: -46.9 },
      basePrice: 15.0,
      calculatedPrice: 15.0,
      isActive: true,
    },
    {
      id: 'toll-3',
      name: 'Pedágio Km 200 (Inativo)',
      coordinates: { lat: -24.0, lng: -47.0 },
      basePrice: 20.0,
      calculatedPrice: 20.0,
      isActive: false,
    },
  ];

  const mockExpenses: ExtraExpenses = {
    food: 50.0,
    lodging: 150.0,
    driverPerDiem: 100.0,
    maintenancePerKm: 0.2, // R$ 0,20 por km
    customItems: [{ id: 'cust-1', name: 'Estacionamento', value: 30.0 }],
  };

  it('calculates one-way trip costs accurately for passenger car', () => {
    const result = calculateTripCosts({
      distanceKm: 100,
      durationMinutes: 90,
      isRoundTrip: false,
      vehicle: VEHICLE_PRESETS.carro,
      customConsumption: 10.0, // 10 km/l => 10 liters
      fuelPrice: 6.0, // R$ 6,00/l => R$ 60,00
      fuelType: 'gasolina',
      tollBooths: mockTollBooths,
      extraExpenses: mockExpenses,
    });

    expect(result.totalDistanceKm).toBe(100);
    expect(result.oneWayDistanceKm).toBe(100);
    expect(result.totalDurationMinutes).toBe(90);
    expect(result.fuelVolumeNeeded).toBe(10);
    expect(result.fuelTotalCost).toBe(60.0);

    // Tolls: toll-1 (10) + toll-2 (15) = 25 (toll-3 is inactive)
    expect(result.tollCount).toBe(2);
    expect(result.tollTotalCost).toBe(25.0);

    // Extras: 50 (food) + 150 (lodging) + 100 (driver) + (100 * 0.20 = 20 maintenance) + 30 (custom) = 350
    expect(result.maintenanceCost).toBe(20.0);
    expect(result.extraExpensesTotal).toBe(350.0);

    // Grand total: 60 (fuel) + 25 (tolls) + 350 (extras) = 435.00
    expect(result.grandTotalCost).toBe(435.0);
    expect(result.costPerKm).toBe(4.35);
    expect(result.costPerOneWayLeg).toBe(435.0);
  });

  it('calculates round-trip costs doubling distance, fuel and tolls', () => {
    const result = calculateTripCosts({
      distanceKm: 100,
      durationMinutes: 90,
      isRoundTrip: true,
      vehicle: VEHICLE_PRESETS.carro,
      customConsumption: 10.0,
      fuelPrice: 6.0,
      fuelType: 'gasolina',
      tollBooths: mockTollBooths,
      extraExpenses: mockExpenses,
    });

    expect(result.totalDistanceKm).toBe(200);
    expect(result.oneWayDistanceKm).toBe(100);
    expect(result.totalDurationMinutes).toBe(180);
    expect(result.fuelVolumeNeeded).toBe(20);
    expect(result.fuelTotalCost).toBe(120.0);

    // Tolls: 2 booths * 2 ways = 4, cost 25 * 2 = 50
    expect(result.tollCount).toBe(4);
    expect(result.tollTotalCost).toBe(50.0);

    // Maintenance: 200 km * 0.20 = 40. Extras total: 50 + 150 + 100 + 40 + 30 = 370
    expect(result.maintenanceCost).toBe(40.0);
    expect(result.extraExpensesTotal).toBe(370.0);

    // Grand total: 120 + 50 + 370 = 540.00
    expect(result.grandTotalCost).toBe(540.0);
    expect(result.costPerKm).toBe(2.7);
    expect(result.costPerOneWayLeg).toBe(270.0);
  });

  it('updates toll booths with vehicle multiplier (e.g. 3-axle truck)', () => {
    const truckMultiplier = VEHICLE_PRESETS.caminhao_3.tollMultiplier; // 3.0x
    const updatedBooths = updateTollBoothsWithMultiplier(mockTollBooths, truckMultiplier);

    expect(updatedBooths[0].calculatedPrice).toBe(30.0); // 10 * 3
    expect(updatedBooths[1].calculatedPrice).toBe(45.0); // 15 * 3
    expect(updatedBooths[2].calculatedPrice).toBe(60.0); // 20 * 3
  });

  it('formats currency, distance and duration correctly in pt-BR', () => {
    expect(formatCurrency(1234.56)).toMatch(/R\$\s*1\.234,56/);
    expect(formatDistance(150.7)).toBe('150,7 km');
    expect(formatDistance(0.45)).toBe('450 m');
    expect(formatDuration(135)).toBe('2h 15min');
    expect(formatDuration(60)).toBe('1h');
    expect(formatDuration(45)).toBe('45 min');
  });
});
