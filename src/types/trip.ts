export type VehicleCategory =
  | 'moto'
  | 'carro'
  | 'van'
  | 'onibus_2'
  | 'onibus_3'
  | 'caminhao_2'
  | 'caminhao_3'
  | 'caminhao_4'
  | 'caminhao_5'
  | 'caminhao_6'
  | 'caminhao_7_9';

export type FuelType = 'gasolina' | 'etanol' | 'diesel_s10' | 'diesel_s500' | 'gnv' | 'eletrico';

export interface VehicleConfig {
  id: VehicleCategory;
  name: string;
  categoryName: string;
  axles: number;
  tollMultiplier: number;
  defaultFuel: FuelType;
  defaultConsumption: number; // km/l or km/kWh
  icon: string;
}

export type RouteMode = 'fastest' | 'shortest' | 'avoid_tolls';

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface LocationPoint {
  address: string;
  coordinates: Coordinates;
  city?: string;
  state?: string;
}

export interface TollBooth {
  id: string;
  name: string;
  highway?: string;
  coordinates: Coordinates;
  basePrice: number; // base price for passenger car (1.0x)
  calculatedPrice: number; // multiplied by vehicle factor
  isCustom?: boolean;
  isActive: boolean;
}

export interface ExtraExpenseItem {
  id: string;
  name: string;
  value: number;
}

export interface ExtraExpenses {
  food: number;
  lodging: number;
  driverPerDiem: number;
  maintenancePerKm: number; // R$/km
  customItems: ExtraExpenseItem[];
}

export interface RouteGeometry {
  coordinates: [number, number][]; // [lng, lat]
  distanceKm: number;
  durationMinutes: number;
  tollBooths: TollBooth[];
}

export interface TripCalculationParams {
  distanceKm: number;
  durationMinutes: number;
  isRoundTrip: boolean;
  vehicle: VehicleConfig;
  customConsumption: number;
  fuelPrice: number;
  fuelType: FuelType;
  tollBooths: TollBooth[];
  extraExpenses: ExtraExpenses;
}

export interface TripCalculationResult {
  totalDistanceKm: number;
  oneWayDistanceKm: number;
  totalDurationMinutes: number;
  isRoundTrip: boolean;

  // Vehicle & Fuel
  fuelVolumeNeeded: number;
  fuelTotalCost: number;
  fuelPricePerUnit: number;
  fuelConsumptionKmL: number;

  // Tolls
  tollCount: number;
  tollTotalCost: number;
  tollBoothsList: TollBooth[];

  // Extras
  extraExpensesTotal: number;
  maintenanceCost: number;
  foodCost: number;
  lodgingCost: number;
  driverPerDiemCost: number;
  customExpensesTotal: number;

  // Summary
  grandTotalCost: number;
  costPerKm: number;
  costPerOneWayLeg: number;
}
