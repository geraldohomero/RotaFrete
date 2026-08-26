import React from 'react';
import { RouteMode } from '../../types/trip';
import { Zap, Ruler, ShieldBan, Repeat, Compass } from 'lucide-react';

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
    <div className="space-y-3.5 p-4 sm:p-5 rounded-3xl bg-white dark:bg-[#11192e] border border-slate-200/90 dark:border-slate-800/90 shadow-lg shadow-slate-900/5 dark:shadow-black/40 transition-all">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center">
            <Compass className="w-4 h-4" />
          </div>
          <label className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200">
            Tipo de Rota
          </label>
        </div>

        {/* Round Trip Switch */}
        <button
          type="button"
          onClick={() => onToggleRoundTrip(!isRoundTrip)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${
            isRoundTrip
              ? 'bg-sky-600 border-sky-500 text-white shadow-md shadow-sky-500/20'
              : 'bg-slate-100 dark:bg-[#162039] border-slate-200 dark:border-slate-700/80 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-[#1e2c4d]'
          }`}
        >
          <Repeat className="w-3.5 h-3.5" />
          <span>Ida e Volta</span>
        </button>
      </div>

      {/* 3 Route Mode Tabs */}
      <div className="grid grid-cols-3 gap-2 sm:gap-2.5">
        {/* Fastest */}
        <button
          type="button"
          onClick={() => onChangeRouteMode('fastest')}
          className={`p-3 rounded-2xl border text-left flex flex-col justify-between transition-all ${
            routeMode === 'fastest'
              ? 'bg-sky-50 dark:bg-sky-950/70 border-sky-500 text-sky-950 dark:text-sky-200 ring-2 ring-sky-500/30 shadow-md shadow-sky-500/10 font-bold'
              : 'border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-[#162039]/60 hover:bg-slate-100 dark:hover:bg-[#18233d] text-slate-600 dark:text-slate-400'
          }`}
        >
          <div className="flex items-center gap-1.5 text-xs font-extrabold mb-1">
            <Zap className="w-3.5 h-3.5 text-sky-500" />
            <span>Mais Rápida</span>
          </div>
          <span className="text-[10px] text-slate-500 dark:text-slate-400 leading-tight">
            Rodovias principais
          </span>
        </button>

        {/* Shortest */}
        <button
          type="button"
          onClick={() => onChangeRouteMode('shortest')}
          className={`p-3 rounded-2xl border text-left flex flex-col justify-between transition-all ${
            routeMode === 'shortest'
              ? 'bg-emerald-50 dark:bg-emerald-950/70 border-emerald-500 text-emerald-950 dark:text-emerald-200 ring-2 ring-emerald-500/30 shadow-md shadow-emerald-500/10 font-bold'
              : 'border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-[#162039]/60 hover:bg-slate-100 dark:hover:bg-[#18233d] text-slate-600 dark:text-slate-400'
          }`}
        >
          <div className="flex items-center gap-1.5 text-xs font-extrabold mb-1">
            <Ruler className="w-3.5 h-3.5 text-emerald-500" />
            <span>Mais Curta</span>
          </div>
          <span className="text-[10px] text-slate-500 dark:text-slate-400 leading-tight">
            Menor distância
          </span>
        </button>

        {/* Avoid Tolls */}
        <button
          type="button"
          onClick={() => onChangeRouteMode('avoid_tolls')}
          className={`p-3 rounded-2xl border text-left flex flex-col justify-between transition-all ${
            routeMode === 'avoid_tolls'
              ? 'bg-purple-50 dark:bg-purple-950/70 border-purple-500 text-purple-950 dark:text-purple-200 ring-2 ring-purple-500/30 shadow-md shadow-purple-500/10 font-bold'
              : 'border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-[#162039]/60 hover:bg-slate-100 dark:hover:bg-[#18233d] text-slate-600 dark:text-slate-400'
          }`}
        >
          <div className="flex items-center gap-1.5 text-xs font-extrabold mb-1">
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
