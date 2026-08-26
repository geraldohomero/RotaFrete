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
  onToggleToll?: (tollId: string) => void;
}

const DEFAULT_CENTER: [number, number] = [-23.5505, -46.6333]; // São Paulo center default

const ROUTE_COLORS: Record<RouteMode, string> = {
  fastest: '#0284c7', // brand sky blue
  shortest: '#10b981', // emerald green
  avoid_tolls: '#8b5cf6', // purple
};

export const TripMap: React.FC<TripMapProps> = ({
  origin,
  destination,
  routeCoordinates,
  tollBooths,
  routeMode,
  isLoading,
  onToggleToll,
}) => {
  // Convert [lng, lat] to Leaflet [lat, lng]
  const polylinePositions: [number, number][] = routeCoordinates.map(([lng, lat]) => [
    lat,
    lng,
  ]);

  return (
    <div className="relative w-full h-[400px] lg:h-full min-h-[400px] rounded-2xl overflow-hidden shadow-lg border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900">
      {isLoading && (
        <div className="absolute inset-0 z-20 bg-slate-900/40 backdrop-blur-sm flex flex-col items-center justify-center text-white gap-3 transition-opacity">
          <div className="w-10 h-10 border-4 border-brand-400 border-t-transparent rounded-full animate-spin"></div>
          <span className="text-sm font-medium tracking-wide drop-shadow-md">Calculando melhor rota...</span>
        </div>
      )}

      <MapContainer
        center={origin ? [origin.coordinates.lat, origin.coordinates.lng] : DEFAULT_CENTER}
        zoom={11}
        scrollWheelZoom={true}
        className="w-full h-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

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
              <div className="p-1">
                <div className="font-bold text-xs uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                  Origem
                </div>
                <div className="text-sm font-medium text-slate-800 dark:text-slate-100 mt-0.5">
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
              <div className="p-1">
                <div className="font-bold text-xs uppercase tracking-wider text-rose-600 dark:text-rose-400">
                  Destino
                </div>
                <div className="text-sm font-medium text-slate-800 dark:text-slate-100 mt-0.5">
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
              <div className="p-2 space-y-1.5 min-w-[200px]">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-bold text-xs uppercase tracking-wider text-amber-600 dark:text-amber-400">
                    Praça de Pedágio
                  </span>
                  <span
                    className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                      booth.isActive
                        ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300'
                        : 'bg-slate-200 text-slate-600 dark:bg-slate-800 dark:text-slate-400'
                    }`}
                  >
                    {booth.isActive ? 'Ativo' : 'Desativado'}
                  </span>
                </div>
                <div className="font-medium text-sm text-slate-900 dark:text-slate-100">
                  {booth.name}
                </div>
                {booth.highway && (
                  <div className="text-xs text-slate-500 dark:text-slate-400">
                    {booth.highway}
                  </div>
                )}
                <div className="text-sm font-bold text-amber-600 dark:text-amber-400 pt-1 border-t border-slate-200 dark:border-slate-700">
                  Tarifa: {formatCurrency(booth.calculatedPrice)}
                </div>
                {onToggleToll && (
                  <button
                    type="button"
                    onClick={() => onToggleToll(booth.id)}
                    className="w-full mt-2 text-xs py-1 px-2 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-medium transition-colors"
                  >
                    {booth.isActive ? 'Desativar este pedágio' : 'Ativar este pedágio'}
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
                color: '#ffffff',
                weight: 8,
                opacity: 0.8,
                lineCap: 'round',
                lineJoin: 'round',
              }}
            />
            {/* Main colored route */}
            <Polyline
              positions={polylinePositions}
              pathOptions={{
                color: ROUTE_COLORS[routeMode],
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
      <div className="absolute top-3 left-3 z-[400] bg-white/90 dark:bg-slate-900/90 backdrop-blur-md px-3 py-1.5 rounded-xl shadow-md border border-slate-200/80 dark:border-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-200 flex items-center gap-1.5">
        <Navigation className="w-3.5 h-3.5 text-brand-500" />
        <span>OpenStreetMap + OSRM</span>
      </div>
    </div>
  );
};
