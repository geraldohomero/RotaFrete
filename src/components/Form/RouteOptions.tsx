import React from 'react';
import { RouteMode } from '../../types/trip';
import { Zap, Ruler, ShieldBan, Repeat } from 'lucide-react';

interface RouteOptionsProps {
  routeMode: RouteMode;
  onChangeRouteMode: (mode: RouteMode) => void;
  isRoundTrip: boolean;
  onToggleRoundTrip: (isRoundTrip: boolean) => void;
}

export const RouteOptions: React.FC<RouteOptionsProps> = ({
  routeMode,
  onChangeRouteMode,
  isRoundTrip,
  onToggleRoundTrip,
}) => {
  return (
    <div className="space-y-3 p-4 rounded-2xl bg-white dark:bg-slate-850 border border-slate-200 dark:border-slate-800 shadow-sm">
      <div className="flex items-center justify-between">
        <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
          Tipo de Rota
        </label>
        {/* Round Trip Switch */}
        <button
          type="button"
          onClick={() => onToggleRoundTrip(!isRoundTrip)}
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-xs font-semibold border transition-all ${
            isRoundTrip
              ? 'bg-brand-600 border-brand-600 text-white shadow-sm'
              : 'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
          }`}
        >
          <Repeat className={`w-3.5 h-3.5 ${isRoundTrip ? 'animate-spin-reverse' : ''}`} />
          <span>Ida e Volta</span>
        </button>
      </div>

      {/* 3 Route Mode Tabs */}
      <div className="grid grid-cols-3 gap-2">
        {/* Fastest */}
        <button
          type="button"
          onClick={() => onChangeRouteMode('fastest')}
          className={`p-2.5 rounded-xl border text-left flex flex-col justify-between transition-all ${
            routeMode === 'fastest'
              ? 'bg-brand-50/80 dark:bg-brand-950/60 border-brand-500 text-brand-700 dark:text-brand-300 ring-2 ring-brand-500/20 font-semibold'
              : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/60 text-slate-600 dark:text-slate-400'
          }`}
        >
          <div className="flex items-center gap-1.5 text-xs font-bold mb-1">
            <Zap className="w-3.5 h-3.5 text-brand-500" />
            <span>Mais Rápida</span>
          </div>
          <span className="text-[10px] text-slate-500 dark:text-slate-400 leading-tight">
            Prioriza rodovias principais
          </span>
        </button>

        {/* Shortest */}
        <button
          type="button"
          onClick={() => onChangeRouteMode('shortest')}
          className={`p-2.5 rounded-xl border text-left flex flex-col justify-between transition-all ${
            routeMode === 'shortest'
              ? 'bg-emerald-50/80 dark:bg-emerald-950/60 border-emerald-500 text-emerald-700 dark:text-emerald-300 ring-2 ring-emerald-500/20 font-semibold'
              : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/60 text-slate-600 dark:text-slate-400'
          }`}
        >
          <div className="flex items-center gap-1.5 text-xs font-bold mb-1">
            <Ruler className="w-3.5 h-3.5 text-emerald-500" />
            <span>Mais Curta</span>
          </div>
          <span className="text-[10px] text-slate-500 dark:text-slate-400 leading-tight">
            Menor distância em km
          </span>
        </button>

        {/* Avoid Tolls */}
        <button
          type="button"
          onClick={() => onChangeRouteMode('avoid_tolls')}
          className={`p-2.5 rounded-xl border text-left flex flex-col justify-between transition-all ${
            routeMode === 'avoid_tolls'
              ? 'bg-purple-50/80 dark:bg-purple-950/60 border-purple-500 text-purple-700 dark:text-purple-300 ring-2 ring-purple-500/20 font-semibold'
              : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/60 text-slate-600 dark:text-slate-400'
          }`}
        >
          <div className="flex items-center gap-1.5 text-xs font-bold mb-1">
            <ShieldBan className="w-3.5 h-3.5 text-purple-500" />
            <span>Sem Pedágio</span>
          </div>
          <span className="text-[10px] text-slate-500 dark:text-slate-400 leading-tight">
            Evita praças e taxas
          </span>
        </button>
      </div>
    </div>
  );
};
