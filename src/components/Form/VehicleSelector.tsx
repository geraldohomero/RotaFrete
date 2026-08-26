import React from 'react';
import { VehicleConfig, FuelType, VehicleCategory } from '../../types/trip';
import { VEHICLE_PRESETS, DEFAULT_FUEL_PRICES } from '../../constants/vehicles';
import { Car, Bike, Truck, Bus, Fuel, Gauge, DollarSign } from 'lucide-react';

interface VehicleSelectorProps {
  selectedVehicle: VehicleConfig;
  onSelectVehicle: (vehicle: VehicleConfig) => void;
  customConsumption: number;
  onChangeConsumption: (consumption: number) => void;
  fuelType: FuelType;
  onChangeFuelType: (fuel: FuelType) => void;
  fuelPrice: number;
  onChangeFuelPrice: (price: number) => void;
}

export const VehicleSelector: React.FC<VehicleSelectorProps> = ({
  selectedVehicle,
  onSelectVehicle,
  customConsumption,
  onChangeConsumption,
  fuelType,
  onChangeFuelType,
  fuelPrice,
  onChangeFuelPrice,
}) => {
  const getIcon = (id: VehicleCategory) => {
    if (id === 'moto') return <Bike className="w-4 h-4" />;
    if (id === 'onibus_2' || id === 'onibus_3') return <Bus className="w-4 h-4" />;
    if (id.startsWith('caminhao') || id === 'van') return <Truck className="w-4 h-4" />;
    return <Car className="w-4 h-4" />;
  };

  const handleFuelChange = (newFuel: FuelType) => {
    onChangeFuelType(newFuel);
    if (DEFAULT_FUEL_PRICES[newFuel]) {
      onChangeFuelPrice(DEFAULT_FUEL_PRICES[newFuel].price);
    }
  };

  return (
    <div className="space-y-3.5 p-4 rounded-2xl bg-white dark:bg-slate-850 border border-slate-200 dark:border-slate-800 shadow-sm">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
          <Truck className="w-4 h-4 text-brand-500" />
          Veículo & Combustível
        </h3>
        <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-brand-50 text-brand-700 dark:bg-brand-950 dark:text-brand-300">
          Pedágio: {selectedVehicle.tollMultiplier.toFixed(1)}x
        </span>
      </div>

      {/* Vehicle Category Select */}
      <div>
        <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
          Categoria do Veículo
        </label>
        <div className="relative">
          <select
            value={selectedVehicle.id}
            onChange={(e) => {
              const found = VEHICLE_PRESETS[e.target.value];
              if (found) onSelectVehicle(found);
            }}
            className="w-full pl-9 pr-8 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 font-medium focus:ring-2 focus:ring-brand-500 focus:outline-none appearance-none cursor-pointer"
          >
            <optgroup label="Passeio & Leves">
              <option value="carro">🚗 Carro de Passeio / SUV (1.0x)</option>
              <option value="moto">🛵 Motocicleta / Triciclo (0.5x)</option>
              <option value="van">🚐 Van / Utilitário Leve (1.0x)</option>
            </optgroup>
            <optgroup label="Ônibus">
              <option value="onibus_2">🚌 Ônibus Urbano/Rodoviário (2 eixos - 2.0x)</option>
              <option value="onibus_3">🚌 Ônibus Trucado (3 eixos - 3.0x)</option>
            </optgroup>
            <optgroup label="Caminhões & Carga Pesada">
              <option value="caminhao_2">🚚 Caminhão Toco / VUC (2 eixos - 2.0x)</option>
              <option value="caminhao_3">🚛 Caminhão Truck (3 eixos - 3.0x)</option>
              <option value="caminhao_4">🚛 Caminhão Bitruck (4 eixos - 4.0x)</option>
              <option value="caminhao_5">🚛 Carreta Simples (5 eixos - 5.0x)</option>
              <option value="caminhao_6">🚛 Carreta LS / Bitrem (6 eixos - 6.0x)</option>
              <option value="caminhao_7_9">🚛 Rodotrem / Treminhão (7 a 9 eixos - 8.0x)</option>
            </optgroup>
          </select>
          <div className="absolute left-3 top-2.5 text-brand-500 pointer-events-none">
            {getIcon(selectedVehicle.id)}
          </div>
        </div>
      </div>

      {/* Fuel Type & Consumption & Price in 3 columns */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
        {/* Fuel Type */}
        <div>
          <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1 flex items-center gap-1">
            <Fuel className="w-3.5 h-3.5 text-amber-500" />
            Combustível
          </label>
          <select
            value={fuelType}
            onChange={(e) => handleFuelChange(e.target.value as FuelType)}
            className="w-full px-2.5 py-1.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 font-medium focus:ring-2 focus:ring-brand-500 focus:outline-none cursor-pointer"
          >
            {Object.entries(DEFAULT_FUEL_PRICES).map(([key, item]) => (
              <option key={key} value={key}>
                {item.label}
              </option>
            ))}
          </select>
        </div>

        {/* Consumption (km/l) */}
        <div>
          <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1 flex items-center gap-1">
            <Gauge className="w-3.5 h-3.5 text-sky-500" />
            Consumo (km/l)
          </label>
          <input
            type="number"
            step="0.1"
            min="0.5"
            max="100"
            value={customConsumption}
            onChange={(e) => onChangeConsumption(parseFloat(e.target.value) || 1)}
            className="w-full px-2.5 py-1.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 font-medium focus:ring-2 focus:ring-brand-500 focus:outline-none"
          />
        </div>

        {/* Fuel Price (R$/l) */}
        <div>
          <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1 flex items-center gap-1">
            <DollarSign className="w-3.5 h-3.5 text-emerald-500" />
            Preço ({DEFAULT_FUEL_PRICES[fuelType]?.unit || 'R$/L'})
          </label>
          <input
            type="number"
            step="0.01"
            min="0.1"
            max="50"
            value={fuelPrice}
            onChange={(e) => onChangeFuelPrice(parseFloat(e.target.value) || 0)}
            className="w-full px-2.5 py-1.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 font-medium focus:ring-2 focus:ring-brand-500 focus:outline-none"
          />
        </div>
      </div>
    </div>
  );
};
