import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import { LocationPoint, TollBooth, RouteMode } from '../../types/trip';
import {
  createOriginMarker,
  createDestinationMarker,
  createTollMarker,
} from './CustomMarkers';
import { MapController } from './MapController';
import { formatCurrency } from '../../utils/calculator';
import { Navigation } from 'lucide-react';

interface TripMapProps {
  origin: LocationPoint | null;
  destination: LocationPoint | null;
  routeCoordinates: [number, number][]; // [lng, lat]
  tollBooths: TollBooth[];
  routeMode: RouteMode;
  isLoading?: boolean;
  isDark?: boolean;
  onToggleToll?: (tollId: string) => void;
}

const DEFAULT_CENTER: [number, number] = [-23.5505, -46.6333]; // São Paulo center default

export const TripMap: React.FC<TripMapProps> = ({
  origin,
  destination,
  routeCoordinates,
  tollBooths,
  routeMode,
  isLoading,
  isDark = false,
  onToggleToll,
}) => {
  // Convert [lng, lat] to Leaflet [lat, lng]
  const polylinePositions: [number, number][] = routeCoordinates.map(([lng, lat]) => [
    lat,
    lng,
  ]);

  const routeColor = isDark
    ? routeMode === 'fastest'
      ? '#38bdf8' // vibrant sky blue
      : routeMode === 'shortest'
      ? '#34d399' // vibrant emerald
      : '#c084fc' // vibrant purple
    : routeMode === 'fastest'
    ? '#0284c7'
    : routeMode === 'shortest'
    ? '#059669'
    : '#7c3aed';

  const tileUrl = isDark
    ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
    : 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

  const tileAttribution = isDark
    ? '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
    : '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>';

  return (
    <div className="relative w-full h-full min-h-[420px] rounded-3xl overflow-hidden shadow-xl border border-slate-200/80 dark:border-slate-800/80 bg-slate-100 dark:bg-[#0f172a] transition-all">
      {isLoading && (
        <div className="absolute inset-0 z-20 bg-slate-900/60 backdrop-blur-md flex flex-col items-center justify-center text-white gap-3 transition-opacity">
          <div className="w-11 h-11 border-4 border-sky-400 border-t-transparent rounded-full animate-spin"></div>
          <span className="text-sm font-semibold tracking-wide drop-shadow-md text-sky-100">
            Calculando melhor rota e praças de pedágio...
          </span>
        </div>
      )}

      <MapContainer
        key={isDark ? 'dark-map' : 'light-map'}
        center={origin ? [origin.coordinates.lat, origin.coordinates.lng] : DEFAULT_CENTER}
        zoom={11}
        scrollWheelZoom={true}
        className="w-full h-full"
      >
        <TileLayer attribution={tileAttribution} url={tileUrl} />

        <MapController
          origin={origin?.coordinates}
          destination={destination?.coordinates}
          coordinates={routeCoordinates}
        />

        {/* Origin Marker */}
        {origin && (
          <Marker
            position={[origin.coordinates.lat, origin.coordinates.lng]}
            icon={createOriginMarker()}
          >
            <Popup className="custom-popup">
              <div className="p-3">
                <div className="font-bold text-[10px] uppercase tracking-wider text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  Ponto de Origem
                </div>
                <div className="text-xs font-semibold text-slate-800 dark:text-slate-100 mt-1">
                  {origin.address}
                </div>
              </div>
            </Popup>
          </Marker>
        )}

        {/* Destination Marker */}
        {destination && (
          <Marker
            position={[destination.coordinates.lat, destination.coordinates.lng]}
            icon={createDestinationMarker()}
          >
            <Popup className="custom-popup">
              <div className="p-3">
                <div className="font-bold text-[10px] uppercase tracking-wider text-rose-600 dark:text-rose-400 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-rose-500"></span>
                  Ponto de Destino
                </div>
                <div className="text-xs font-semibold text-slate-800 dark:text-slate-100 mt-1">
                  {destination.address}
                </div>
              </div>
            </Popup>
          </Marker>
        )}

        {/* Toll Booth Markers */}
        {tollBooths.map((booth) => (
          <Marker
            key={booth.id}
            position={[booth.coordinates.lat, booth.coordinates.lng]}
            icon={createTollMarker(formatCurrency(booth.calculatedPrice), booth.isActive)}
          >
            <Popup className="custom-popup">
              <div className="p-3 space-y-2 min-w-[220px]">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-bold text-[10px] uppercase tracking-wider text-amber-500 dark:text-amber-400">
                    Praça de Pedágio
                  </span>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      booth.isActive
                        ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/80 dark:text-emerald-300'
                        : 'bg-slate-200 text-slate-600 dark:bg-slate-800 dark:text-slate-400'
                    }`}
                  >
                    {booth.isActive ? 'Ativo' : 'Desativado'}
                  </span>
                </div>
                <div className="font-bold text-xs text-slate-900 dark:text-slate-100">
                  {booth.name}
                </div>
                {booth.highway && (
                  <div className="text-[11px] text-slate-500 dark:text-slate-400">
                    {booth.highway}
                  </div>
                )}
                <div className="flex items-center justify-between pt-1 border-t border-slate-200 dark:border-slate-700/80">
                  <span className="text-[11px] text-slate-500 dark:text-slate-400">Tarifa calculada:</span>
                  <span className="text-sm font-extrabold text-amber-600 dark:text-amber-400">
                    {formatCurrency(booth.calculatedPrice)}
                  </span>
                </div>
                {onToggleToll && (
                  <button
                    type="button"
                    onClick={() => onToggleToll(booth.id)}
                    className="w-full text-xs py-1.5 px-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold transition-colors flex items-center justify-center gap-1"
                  >
                    <span>{booth.isActive ? 'Desativar este pedágio' : 'Ativar este pedágio'}</span>
                  </button>
                )}
              </div>
            </Popup>
          </Marker>
        ))}

        {/* Route Polyline */}
        {polylinePositions.length > 0 && (
          <>
            {/* Outline / glow layer */}
            <Polyline
              positions={polylinePositions}
              pathOptions={{
                color: isDark ? '#0284c7' : '#ffffff',
                weight: isDark ? 8 : 8,
                opacity: isDark ? 0.3 : 0.8,
                lineCap: 'round',
                lineJoin: 'round',
              }}
            />
            {/* Main colored route */}
            <Polyline
              positions={polylinePositions}
              pathOptions={{
                color: routeColor,
                weight: 5,
                opacity: 0.95,
                lineCap: 'round',
                lineJoin: 'round',
              }}
            />
          </>
        )}
      </MapContainer>

      {/* Mode badge overlay */}
      <div className="absolute top-4 left-4 z-[400] bg-white/90 dark:bg-slate-900/90 backdrop-blur-md px-3 py-1.5 rounded-xl shadow-lg border border-slate-200/80 dark:border-slate-700/80 text-xs font-bold text-slate-700 dark:text-slate-200 flex items-center gap-1.5">
        <Navigation className="w-3.5 h-3.5 text-sky-500" />
      </div>
    </div>
  );
};
