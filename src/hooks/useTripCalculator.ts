import { useState, useEffect, useCallback, useMemo } from 'react';
import {
  LocationPoint,
  VehicleConfig,
  FuelType,
  RouteMode,
  TollBooth,
  ExtraExpenses,
  TripCalculationResult,
  Coordinates,
} from '../types/trip';
import { VEHICLE_PRESETS, DEFAULT_FUEL_PRICES } from '../constants/vehicles';
import {
  calculateTripCosts,
  updateTollBoothsWithMultiplier,
} from '../utils/calculator';
import { calculateRoute } from '../services/routing';
import { createCustomTollBooth } from '../services/tollDetection';

const INITIAL_EXPENSES: ExtraExpenses = {
  food: 0,
  lodging: 0,
  driverPerDiem: 0,
  maintenancePerKm: 0,
  customItems: [],
};

export function useTripCalculator() {
  const [origin, setOrigin] = useState<LocationPoint | null>(null);
  const [destination, setDestination] = useState<LocationPoint | null>(null);
  const [vehicle, setVehicleState] = useState<VehicleConfig>(VEHICLE_PRESETS.carro);
  const [customConsumption, setCustomConsumption] = useState<number>(VEHICLE_PRESETS.carro.defaultConsumption);
  const [fuelType, setFuelType] = useState<FuelType>(VEHICLE_PRESETS.carro.defaultFuel);
  const [fuelPrice, setFuelPrice] = useState<number>(DEFAULT_FUEL_PRICES.gasolina.price);
  const [routeMode, setRouteMode] = useState<RouteMode>('fastest');
  const [isRoundTrip, setIsRoundTrip] = useState<boolean>(false);
  const [extraExpenses, setExtraExpenses] = useState<ExtraExpenses>(INITIAL_EXPENSES);
  const [tollBooths, setTollBooths] = useState<TollBooth[]>([]);
  const [routeCoordinates, setRouteCoordinates] = useState<[number, number][]>([]);
  const [distanceKm, setDistanceKm] = useState<number>(0);
  const [durationMinutes, setDurationMinutes] = useState<number>(0);
  const [isLoadingRoute, setIsLoadingRoute] = useState<boolean>(false);
  const [routeError, setRouteError] = useState<string | null>(null);
  const [googleApiKey, setGoogleApiKey] = useState<string>(() => {
    try {
      return localStorage.getItem('rotafrete_google_key') || '';
    } catch {
      return '';
    }
  });

  // Handle vehicle change
  const setVehicle = useCallback((newVehicle: VehicleConfig) => {
    setVehicleState(newVehicle);
    setCustomConsumption(newVehicle.defaultConsumption);
    setFuelType(newVehicle.defaultFuel);
    setFuelPrice(DEFAULT_FUEL_PRICES[newVehicle.defaultFuel].price);

    // Update prices on existing toll booths
    setTollBooths((prev) => updateTollBoothsWithMultiplier(prev, newVehicle.tollMultiplier));
  }, []);

  // Swap origin and destination
  const swapOriginDestination = useCallback(() => {
    setOrigin((prevOrigin) => {
      const oldOrigin = prevOrigin;
      setDestination(oldOrigin);
      return destination;
    });
  }, [destination]);

  // Recalculate route whenever origin, destination or routeMode changes
  const fetchRoute = useCallback(async () => {
    if (!origin || !destination) {
      setRouteCoordinates([]);
      setDistanceKm(0);
      setDurationMinutes(0);
      setTollBooths([]);
      setRouteError(null);
      return;
    }

    setIsLoadingRoute(true);
    setRouteError(null);

    try {
      const result = await calculateRoute(
        origin.coordinates,
        destination.coordinates,
        routeMode,
        vehicle.tollMultiplier,
        googleApiKey || undefined
      );

      if (result.error) {
        setRouteError(result.error);
        setRouteCoordinates([]);
        setDistanceKm(0);
        setDurationMinutes(0);
      } else {
        setDistanceKm(result.distanceKm);
        setDurationMinutes(result.durationMinutes);
        setRouteCoordinates(result.coordinates);
        setTollBooths(result.tollBooths);
      }
    } catch (err: any) {
      setRouteError(err.message || 'Falha ao traçar rota.');
    } finally {
      setIsLoadingRoute(false);
    }
  }, [origin, destination, routeMode, vehicle.tollMultiplier, googleApiKey]);

  useEffect(() => {
    fetchRoute();
  }, [origin, destination, routeMode, googleApiKey]);

  // Toll management handlers
  const updateTollPrice = useCallback((tollId: string, newPrice: number) => {
    setTollBooths((prev) =>
      prev.map((booth) =>
        booth.id === tollId
          ? { ...booth, calculatedPrice: Math.max(0, newPrice) }
          : booth
      )
    );
  }, []);

  const toggleTollActive = useCallback((tollId: string) => {
    setTollBooths((prev) =>
      prev.map((booth) =>
        booth.id === tollId ? { ...booth, isActive: !booth.isActive } : booth
      )
    );
  }, []);

  const addCustomToll = useCallback(
    (name: string, basePrice: number, coords?: Coordinates) => {
      const centerCoords: Coordinates = coords || (origin ? origin.coordinates : { lat: -23.55, lng: -46.63 });
      const newBooth = createCustomTollBooth(name, basePrice, centerCoords, vehicle.tollMultiplier);
      setTollBooths((prev) => [newBooth, ...prev]);
    },
    [origin, vehicle.tollMultiplier]
  );

  const removeToll = useCallback((tollId: string) => {
    setTollBooths((prev) => prev.filter((b) => b.id !== tollId));
  }, []);

  // Extra expenses handlers
  const updateExtraExpenses = useCallback((updates: Partial<ExtraExpenses>) => {
    setExtraExpenses((prev) => ({ ...prev, ...updates }));
  }, []);

  const addCustomExpense = useCallback((name: string, value: number) => {
    const newItem = {
      id: `exp-${Date.now()}-${Math.random().toString(36).substring(2, 5)}`,
      name: name.trim() || 'Despesa Extra',
      value: Math.max(0, value),
    };
    setExtraExpenses((prev) => ({
      ...prev,
      customItems: [...prev.customItems, newItem],
    }));
  }, []);

  const removeCustomExpense = useCallback((id: string) => {
    setExtraExpenses((prev) => ({
      ...prev,
      customItems: prev.customItems.filter((i) => i.id !== id),
    }));
  }, []);

  // Save google key to local storage
  const updateGoogleApiKey = useCallback((key: string) => {
    setGoogleApiKey(key);
    try {
      localStorage.setItem('rotafrete_google_key', key);
    } catch {}
  }, []);

  // Calculated results
  const calculationResult: TripCalculationResult = useMemo(() => {
    return calculateTripCosts({
      distanceKm,
      durationMinutes,
      isRoundTrip,
      vehicle,
      customConsumption,
      fuelPrice,
      fuelType,
      tollBooths,
      extraExpenses,
    });
  }, [
    distanceKm,
    durationMinutes,
    isRoundTrip,
    vehicle,
    customConsumption,
    fuelPrice,
    fuelType,
    tollBooths,
    extraExpenses,
  ]);

  // Reset form
  const resetForm = useCallback(() => {
    setOrigin(null);
    setDestination(null);
    setRouteCoordinates([]);
    setDistanceKm(0);
    setDurationMinutes(0);
    setTollBooths([]);
    setExtraExpenses(INITIAL_EXPENSES);
    setIsRoundTrip(false);
    setRouteError(null);
  }, []);

  return {
    origin,
    setOrigin,
    destination,
    setDestination,
    swapOriginDestination,
    vehicle,
    setVehicle,
    customConsumption,
    setCustomConsumption,
    fuelType,
    setFuelType,
    fuelPrice,
    setFuelPrice,
    routeMode,
    setRouteMode,
    isRoundTrip,
    setIsRoundTrip,
    extraExpenses,
    updateExtraExpenses,
    addCustomExpense,
    removeCustomExpense,
    tollBooths,
    updateTollPrice,
    toggleTollActive,
    addCustomToll,
    removeToll,
    routeCoordinates,
    distanceKm,
    durationMinutes,
    isLoadingRoute,
    routeError,
    googleApiKey,
    updateGoogleApiKey,
    calculationResult,
    recalculateRoute: fetchRoute,
    resetForm,
  };
}
