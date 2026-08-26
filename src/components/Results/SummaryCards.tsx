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
        <div className="p-4 rounded-3xl bg-gradient-to-br from-sky-50 to-indigo-100 dark:from-[#132347] dark:to-[#0f172a] border border-sky-200/80 dark:border-sky-700/50 shadow-lg shadow-sky-500/5 dark:shadow-black/40 relative overflow-hidden transition-all hover:scale-[1.01]">
          <div className="flex items-center justify-between text-sky-700 dark:text-sky-300 mb-1.5">
            <span className="text-[11px] font-extrabold uppercase tracking-wider">Custo Total</span>
            <div className="w-6 h-6 rounded-lg bg-sky-500/20 text-sky-600 dark:text-sky-300 flex items-center justify-center">
              <DollarSign className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
            {formatCurrency(calculation.grandTotalCost)}
          </div>
          <div className="text-[11px] font-semibold text-sky-600 dark:text-sky-400 mt-1.5 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-sky-500"></span>
            <span>{calculation.isRoundTrip ? 'Ida e Volta (2 trechos)' : 'Apenas Ida'}</span>
          </div>
        </div>

        {/* Card 2: Distância Total */}
        <div className="p-4 rounded-3xl bg-white dark:bg-[#11192e] border border-slate-200/90 dark:border-slate-800/90 shadow-lg shadow-slate-900/5 dark:shadow-black/40 transition-all hover:scale-[1.01]">
          <div className="flex items-center justify-between text-slate-600 dark:text-slate-400 mb-1.5">
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-700 dark:text-slate-300">Distância</span>
            <div className="w-6 h-6 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
              <Navigation className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
            {formatDistance(calculation.totalDistanceKm)}
          </div>
          <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1.5">
            {calculation.isRoundTrip
              ? `${formatDistance(calculation.oneWayDistanceKm)} por trecho`
              : 'Percurso direto'}
          </div>
        </div>

        {/* Card 3: Tempo Estimado */}
        <div className="p-4 rounded-3xl bg-white dark:bg-[#11192e] border border-slate-200/90 dark:border-slate-800/90 shadow-lg shadow-slate-900/5 dark:shadow-black/40 transition-all hover:scale-[1.01]">
          <div className="flex items-center justify-between text-slate-600 dark:text-slate-400 mb-1.5">
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-700 dark:text-slate-300">Tempo</span>
            <div className="w-6 h-6 rounded-lg bg-sky-500/10 text-sky-500 flex items-center justify-center">
              <Clock className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
            {formatDuration(calculation.totalDurationMinutes)}
          </div>
          <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1.5">
            Estimativa média de viagem
          </div>
        </div>

        {/* Card 4: Custo por KM */}
        <div className="p-4 rounded-3xl bg-white dark:bg-[#11192e] border border-slate-200/90 dark:border-slate-800/90 shadow-lg shadow-slate-900/5 dark:shadow-black/40 transition-all hover:scale-[1.01]">
          <div className="flex items-center justify-between text-slate-600 dark:text-slate-400 mb-1.5">
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-700 dark:text-slate-300">Custo / KM</span>
            <div className="w-6 h-6 rounded-lg bg-indigo-500/10 text-indigo-500 flex items-center justify-center">
              <TrendingUp className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
            {formatCurrency(calculation.costPerKm)}
          </div>
          <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1.5">
            {calculation.isRoundTrip
              ? `Trecho: ${formatCurrency(calculation.costPerOneWayLeg)}`
              : 'Média por quilômetro'}
          </div>
        </div>
      </div>

      {/* Action Buttons Bar */}
      <div className="flex flex-wrap items-center gap-3">
        {/* Quick WhatsApp Copy Button */}
        <button
          type="button"
          onClick={onQuickCopyWhatsApp}
          disabled={!hasRoute}
          className="flex-1 min-w-[200px] py-3 px-5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2.5 shadow-lg shadow-emerald-600/25 transition-all hover:scale-[1.01] active:scale-[0.99]"
        >
          <Share2 className="w-4 h-4" />
          <span>Copiar Relatório WhatsApp</span>
        </button>

        {/* Detailed Report Modal Button */}
        <button
          type="button"
          onClick={onOpenReportModal}
          disabled={!hasRoute}
          className="py-3 px-5 rounded-2xl bg-white dark:bg-[#11192e] hover:bg-slate-50 dark:hover:bg-[#18233d] disabled:opacity-50 disabled:cursor-not-allowed text-slate-800 dark:text-slate-100 font-bold text-xs sm:text-sm border border-slate-200 dark:border-slate-700/80 flex items-center justify-center gap-2 shadow-sm transition-all"
        >
          <FileText className="w-4 h-4 text-sky-500" />
          <span>Ver Relatório Completo</span>
        </button>

        {/* Reset Button */}
        <button
          type="button"
          onClick={onReset}
          className="p-3 rounded-2xl bg-slate-100 hover:bg-slate-200 dark:bg-[#11192e] dark:hover:bg-[#18233d] text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 transition-colors shadow-sm"
          title="Limpar e Iniciar Nova Consulta"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
