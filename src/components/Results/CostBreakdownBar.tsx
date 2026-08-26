import React from 'react';
import { TripCalculationResult } from '../../types/trip';
import { formatCurrency } from '../../utils/calculator';

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
    <div className="p-4 rounded-2xl bg-white dark:bg-slate-850 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2.5">
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
          Composição dos Custos
        </span>
        <span className="text-xs font-extrabold text-slate-900 dark:text-slate-100">
          {formatCurrency(total)}
        </span>
      </div>

      {/* Segmented Progress Bar */}
      <div className="w-full h-3.5 rounded-full overflow-hidden flex bg-slate-100 dark:bg-slate-800 p-0.5 gap-0.5">
        {fuelPercent > 0 && (
          <div
            style={{ width: `${fuelPercent}%` }}
            className="h-full rounded-full bg-brand-500 transition-all duration-500 relative group cursor-pointer"
            title={`Combustível: ${formatCurrency(calculation.fuelTotalCost)} (${fuelPercent.toFixed(0)}%)`}
          />
        )}
        {tollPercent > 0 && (
          <div
            style={{ width: `${tollPercent}%` }}
            className="h-full rounded-full bg-amber-500 transition-all duration-500 relative group cursor-pointer"
            title={`Pedágios: ${formatCurrency(calculation.tollTotalCost)} (${tollPercent.toFixed(0)}%)`}
          />
        )}
        {extraPercent > 0 && (
          <div
            style={{ width: `${extraPercent}%` }}
            className="h-full rounded-full bg-purple-500 transition-all duration-500 relative group cursor-pointer"
            title={`Outras Despesas: ${formatCurrency(calculation.extraExpensesTotal)} (${extraPercent.toFixed(0)}%)`}
          />
        )}
      </div>

      {/* Legend Chips */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1 text-xs">
        {/* Fuel */}
        <div className="flex items-center justify-between p-2 rounded-xl bg-brand-50/60 dark:bg-brand-950/40 border border-brand-100 dark:border-brand-900/40">
          <div className="flex items-center gap-1.5 text-brand-700 dark:text-brand-300 font-medium">
            <span className="w-2 h-2 rounded-full bg-brand-500"></span>
            <span>Combustível</span>
          </div>
          <span className="font-bold text-slate-900 dark:text-slate-100">
            {formatCurrency(calculation.fuelTotalCost)}{' '}
            <span className="text-[10px] text-slate-500 font-normal">
              ({fuelPercent.toFixed(0)}%)
            </span>
          </span>
        </div>

        {/* Tolls */}
        <div className="flex items-center justify-between p-2 rounded-xl bg-amber-50/60 dark:bg-amber-950/40 border border-amber-100 dark:border-amber-900/40">
          <div className="flex items-center gap-1.5 text-amber-700 dark:text-amber-300 font-medium">
            <span className="w-2 h-2 rounded-full bg-amber-500"></span>
            <span>Pedágios</span>
          </div>
          <span className="font-bold text-slate-900 dark:text-slate-100">
            {formatCurrency(calculation.tollTotalCost)}{' '}
            <span className="text-[10px] text-slate-500 font-normal">
              ({tollPercent.toFixed(0)}%)
            </span>
          </span>
        </div>

        {/* Extras */}
        <div className="flex items-center justify-between p-2 rounded-xl bg-purple-50/60 dark:bg-purple-950/40 border border-purple-100 dark:border-purple-900/40">
          <div className="flex items-center gap-1.5 text-purple-700 dark:text-purple-300 font-medium">
            <span className="w-2 h-2 rounded-full bg-purple-500"></span>
            <span>Extras / Outros</span>
          </div>
          <span className="font-bold text-slate-900 dark:text-slate-100">
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
