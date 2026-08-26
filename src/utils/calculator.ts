import { TripCalculationParams, TripCalculationResult, TollBooth } from '../types/trip';

export function calculateTripCosts(params: TripCalculationParams): TripCalculationResult {
  const {
    distanceKm,
    durationMinutes,
    isRoundTrip,
    customConsumption,
    fuelPrice,
    tollBooths,
    extraExpenses,
  } = params;

  const multiplier = isRoundTrip ? 2 : 1;
  const oneWayDistanceKm = Math.max(0, distanceKm);
  const totalDistanceKm = oneWayDistanceKm * multiplier;
  const totalDurationMinutes = Math.max(0, durationMinutes) * multiplier;

  // Fuel calculation
  const consumption = Math.max(0.1, customConsumption || 10);
  const fuelVolumeNeeded = totalDistanceKm > 0 ? totalDistanceKm / consumption : 0;
  const fuelTotalCost = fuelVolumeNeeded * Math.max(0, fuelPrice);

  // Toll calculation (considering active booths)
  const activeBooths = tollBooths.filter((booth) => booth.isActive);
  const oneWayTollCost = activeBooths.reduce((sum, booth) => sum + (booth.calculatedPrice || 0), 0);
  const tollTotalCost = oneWayTollCost * multiplier;
  const tollCount = activeBooths.length * multiplier;

  // Extra expenses
  const foodCost = Math.max(0, extraExpenses.food || 0);
  const lodgingCost = Math.max(0, extraExpenses.lodging || 0);
  const driverPerDiemCost = Math.max(0, extraExpenses.driverPerDiem || 0);
  const maintenanceRate = Math.max(0, extraExpenses.maintenancePerKm || 0);
  const maintenanceCost = totalDistanceKm * maintenanceRate;

  const customExpensesTotal = (extraExpenses.customItems || []).reduce(
    (sum, item) => sum + Math.max(0, item.value || 0),
    0
  );

  const extraExpensesTotal =
    foodCost + lodgingCost + driverPerDiemCost + maintenanceCost + customExpensesTotal;

  const grandTotalCost = fuelTotalCost + tollTotalCost + extraExpensesTotal;
  const costPerKm = totalDistanceKm > 0 ? grandTotalCost / totalDistanceKm : 0;
  const costPerOneWayLeg = isRoundTrip ? grandTotalCost / 2 : grandTotalCost;

  return {
    totalDistanceKm,
    oneWayDistanceKm,
    totalDurationMinutes,
    isRoundTrip,
    fuelVolumeNeeded,
    fuelTotalCost,
    fuelPricePerUnit: fuelPrice,
    fuelConsumptionKmL: consumption,
    tollCount,
    tollTotalCost,
    tollBoothsList: tollBooths,
    extraExpensesTotal,
    maintenanceCost,
    foodCost,
    lodgingCost,
    driverPerDiemCost,
    customExpensesTotal,
    grandTotalCost,
    costPerKm,
    costPerOneWayLeg,
  };
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value || 0);
}

export function formatDistance(km: number): string {
  if (km < 1) {
    return `${Math.round(km * 1000)} m`;
  }
  return `${km.toFixed(1).replace('.', ',')} km`;
}

export function formatDuration(minutes: number): string {
  if (!minutes || minutes <= 0) return '0 min';
  const hours = Math.floor(minutes / 60);
  const remainingMins = Math.round(minutes % 60);

  if (hours === 0) {
    return `${remainingMins} min`;
  }
  if (remainingMins === 0) {
    return `${hours}h`;
  }
  return `${hours}h ${remainingMins}min`;
}

export function updateTollBoothsWithMultiplier(
  tollBooths: TollBooth[],
  multiplier: number
): TollBooth[] {
  return tollBooths.map((booth) => ({
    ...booth,
    calculatedPrice: Number((booth.basePrice * multiplier).toFixed(2)),
  }));
}
