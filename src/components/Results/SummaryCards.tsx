import React from 'react';
import { TripCalculationResult } from '../../types/trip';
import {
  formatCurrency,
  formatDistance,
  formatDuration,
} from '../../utils/calculator';
import {
  DollarSign,
  Navigation,
  Clock,
  TrendingUp,
  Share2,
  FileText,
  RotateCcw,
} from 'lucide-react';

interface SummaryCardsProps {
  calculation: TripCalculationResult;
  onOpenReportModal: () => void;
  onQuickCopyWhatsApp: () => void;
  onReset: () => void;
  hasRoute: boolean;
}

export const SummaryCards: React.FC<SummaryCardsProps> = ({
  calculation,
  onOpenReportModal,
  onQuickCopyWhatsApp,
  onReset,
  hasRoute,
}) => {
  return (
    <div className="space-y-4">
      {/* 4 Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {/* Card 1: Custo Total */}
        <div className="p-3.5 rounded-2xl bg-gradient-to-br from-brand-50 to-sky-100 dark:from-brand-950/70 dark:to-slate-900 border border-brand-200/80 dark:border-brand-900/60 shadow-sm relative overflow-hidden">
          <div className="flex items-center justify-between text-brand-700 dark:text-brand-300 mb-1">
            <span className="text-[11px] font-bold uppercase tracking-wider">Custo Total</span>
            <DollarSign className="w-4 h-4" />
          </div>
          <div className="text-xl sm:text-2xl font-black text-brand-950 dark:text-white tracking-tight">
            {formatCurrency(calculation.grandTotalCost)}
          </div>
          <div className="text-[10px] font-medium text-brand-600 dark:text-brand-400 mt-1">
            {calculation.isRoundTrip ? 'Ida e Volta (2 trechos)' : 'Apenas Ida'}
          </div>
        </div>

        {/* Card 2: Distância Total */}
        <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-850 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between text-slate-600 dark:text-slate-400 mb-1">
            <span className="text-[11px] font-bold uppercase tracking-wider">Distância</span>
            <Navigation className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
            {formatDistance(calculation.totalDistanceKm)}
          </div>
          <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-1">
            {calculation.isRoundTrip
              ? `${formatDistance(calculation.oneWayDistanceKm)} por trecho`
              : 'Percurso direto'}
          </div>
        </div>

        {/* Card 3: Tempo Estimado */}
        <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-850 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between text-slate-600 dark:text-slate-400 mb-1">
            <span className="text-[11px] font-bold uppercase tracking-wider">Tempo</span>
            <Clock className="w-4 h-4 text-sky-500" />
          </div>
          <div className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
            {formatDuration(calculation.totalDurationMinutes)}
          </div>
          <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-1">
            Estimativa de tráfego livre
          </div>
        </div>

        {/* Card 4: Custo por KM */}
        <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-850 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between text-slate-600 dark:text-slate-400 mb-1">
            <span className="text-[11px] font-bold uppercase tracking-wider">Custo / KM</span>
            <TrendingUp className="w-4 h-4 text-indigo-500" />
          </div>
          <div className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
            {formatCurrency(calculation.costPerKm)}
          </div>
          <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-1">
            {calculation.isRoundTrip
              ? `Trecho: ${formatCurrency(calculation.costPerOneWayLeg)}`
              : 'Média total'}
          </div>
        </div>
      </div>

      {/* Action Buttons Bar */}
      <div className="flex flex-wrap items-center gap-2.5">
        {/* Quick WhatsApp Copy Button */}
        <button
          type="button"
          onClick={onQuickCopyWhatsApp}
          disabled={!hasRoute}
          className="flex-1 min-w-[200px] py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md shadow-emerald-600/20 transition-all hover:scale-[1.01] active:scale-[0.99]"
        >
          <Share2 className="w-4 h-4" />
          <span>Copiar Relatório WhatsApp</span>
        </button>

        {/* Detailed Report Modal Button */}
        <button
          type="button"
          onClick={onOpenReportModal}
          disabled={!hasRoute}
          className="py-2.5 px-4 rounded-xl bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700/80 disabled:opacity-50 disabled:cursor-not-allowed text-slate-800 dark:text-slate-200 font-semibold text-xs sm:text-sm border border-slate-200 dark:border-slate-700 flex items-center justify-center gap-2 shadow-sm transition-all"
        >
          <FileText className="w-4 h-4 text-brand-500" />
          <span>Ver Relatório Completo</span>
        </button>

        {/* Reset Button */}
        <button
          type="button"
          onClick={onReset}
          className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700 transition-colors"
          title="Limpar Rota"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
