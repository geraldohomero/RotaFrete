import React from 'react';
import { TripCalculationResult } from '../../types/trip';
import { formatCurrency } from '../../utils/calculator';
import { PieChart } from 'lucide-react';

interface CostBreakdownBarProps {
  calculation: TripCalculationResult;
}

export const CostBreakdownBar: React.FC<CostBreakdownBarProps> = ({
  calculation,
}) => {
  const total = calculation.grandTotalCost;
  if (total <= 0) return null;

  const fuelPercent = (calculation.fuelTotalCost / total) * 100;
  const tollPercent = (calculation.tollTotalCost / total) * 100;
  const extraPercent = (calculation.extraExpensesTotal / total) * 100;

  return (
    <div className="p-4 sm:p-5 rounded-3xl bg-white dark:bg-[#11192e] border border-slate-200/90 dark:border-slate-800/90 shadow-lg shadow-slate-900/5 dark:shadow-black/40 space-y-3 transition-all">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-xl bg-sky-500/10 text-sky-500 flex items-center justify-center">
            <PieChart className="w-4 h-4" />
          </div>
          <span className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200">
            Composição dos Gastos
          </span>
        </div>
        <span className="text-sm font-black text-slate-900 dark:text-white">
          {formatCurrency(total)}
        </span>
      </div>

      {/* Segmented Progress Bar */}
      <div className="w-full h-4 rounded-full overflow-hidden flex bg-slate-100 dark:bg-[#162039] p-0.5 gap-1 shadow-inner">
        {fuelPercent > 0 && (
          <div
            style={{ width: `${fuelPercent}%` }}
            className="h-full rounded-full bg-gradient-to-r from-sky-600 to-sky-400 transition-all duration-500 relative group cursor-pointer shadow-sm"
            title={`Combustível: ${formatCurrency(calculation.fuelTotalCost)} (${fuelPercent.toFixed(0)}%)`}
          />
        )}
        {tollPercent > 0 && (
          <div
            style={{ width: `${tollPercent}%` }}
            className="h-full rounded-full bg-gradient-to-r from-amber-600 to-amber-400 transition-all duration-500 relative group cursor-pointer shadow-sm"
            title={`Pedágios: ${formatCurrency(calculation.tollTotalCost)} (${tollPercent.toFixed(0)}%)`}
          />
        )}
        {extraPercent > 0 && (
          <div
            style={{ width: `${extraPercent}%` }}
            className="h-full rounded-full bg-gradient-to-r from-purple-600 to-purple-400 transition-all duration-500 relative group cursor-pointer shadow-sm"
            title={`Outras Despesas: ${formatCurrency(calculation.extraExpensesTotal)} (${extraPercent.toFixed(0)}%)`}
          />
        )}
      </div>

      {/* Legend Chips */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1 text-xs">
        {/* Fuel */}
        <div className="flex items-center justify-between p-2.5 rounded-2xl bg-sky-50/70 dark:bg-[#162039]/80 border border-sky-100 dark:border-sky-900/40">
          <div className="flex items-center gap-2 text-sky-800 dark:text-sky-300 font-semibold">
            <span className="w-2.5 h-2.5 rounded-full bg-sky-500 shadow-sm shadow-sky-500/50"></span>
            <span>Combustível</span>
          </div>
          <span className="font-extrabold text-slate-900 dark:text-white">
            {formatCurrency(calculation.fuelTotalCost)}{' '}
            <span className="text-[10px] text-slate-500 font-normal">
              ({fuelPercent.toFixed(0)}%)
            </span>
          </span>
        </div>

        {/* Tolls */}
        <div className="flex items-center justify-between p-2.5 rounded-2xl bg-amber-50/70 dark:bg-[#162039]/80 border border-amber-100 dark:border-amber-900/40">
          <div className="flex items-center gap-2 text-amber-800 dark:text-amber-300 font-semibold">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 shadow-sm shadow-amber-500/50"></span>
            <span>Pedágios</span>
          </div>
          <span className="font-extrabold text-slate-900 dark:text-white">
            {formatCurrency(calculation.tollTotalCost)}{' '}
            <span className="text-[10px] text-slate-500 font-normal">
              ({tollPercent.toFixed(0)}%)
            </span>
          </span>
        </div>

        {/* Extras */}
        <div className="flex items-center justify-between p-2.5 rounded-2xl bg-purple-50/70 dark:bg-[#162039]/80 border border-purple-100 dark:border-purple-900/40">
          <div className="flex items-center gap-2 text-purple-800 dark:text-purple-300 font-semibold">
            <span className="w-2.5 h-2.5 rounded-full bg-purple-500 shadow-sm shadow-purple-500/50"></span>
            <span>Outros Gastos</span>
          </div>
          <span className="font-extrabold text-slate-900 dark:text-white">
            {formatCurrency(calculation.extraExpensesTotal)}{' '}
            <span className="text-[10px] text-slate-500 font-normal">
              ({extraPercent.toFixed(0)}%)
            </span>
          </span>
        </div>
      </div>
    </div>
  );
};
