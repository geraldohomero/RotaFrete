import React, { useState } from 'react';
import { ExtraExpenses } from '../../types/trip';
import {
  Utensils,
  Hotel,
  UserCheck,
  Wrench,
  Plus,
  Trash2,
  ChevronDown,
  ChevronUp,
  Receipt,
} from 'lucide-react';

interface ExtraExpensesSectionProps {
  expenses: ExtraExpenses;
  onUpdateExpenses: (updates: Partial<ExtraExpenses>) => void;
  onAddCustomExpense: (name: string, value: number) => void;
  onRemoveCustomExpense: (id: string) => void;
}

export const ExtraExpensesSection: React.FC<ExtraExpensesSectionProps> = ({
  expenses,
  onUpdateExpenses,
  onAddCustomExpense,
  onRemoveCustomExpense,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [newExpenseName, setNewExpenseName] = useState('');
  const [newExpenseValue, setNewExpenseValue] = useState<string>('');

  const handleAddCustom = (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseFloat(newExpenseValue);
    if (!newExpenseName.trim() || isNaN(val) || val <= 0) return;

    onAddCustomExpense(newExpenseName.trim(), val);
    setNewExpenseName('');
    setNewExpenseValue('');
  };

  const totalExtras =
    expenses.food +
    expenses.lodging +
    expenses.driverPerDiem +
    (expenses.customItems || []).reduce((s, i) => s + i.value, 0);

  return (
    <div className="rounded-2xl bg-white dark:bg-slate-850 border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden transition-all">
      {/* Header / Accordion trigger */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-4 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/40 text-left transition-colors"
      >
        <div className="flex items-center gap-2">
          <Receipt className="w-4 h-4 text-brand-500" />
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              Outros Gastos & Diárias
            </h3>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Alimentação, hospedagem, motorista, manutenção
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {totalExtras > 0 && (
            <span className="text-xs font-bold text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-brand-950 px-2 py-0.5 rounded-full">
              + R$ {totalExtras.toFixed(2)}
            </span>
          )}
          {isOpen ? (
            <ChevronUp className="w-4 h-4 text-slate-400" />
          ) : (
            <ChevronDown className="w-4 h-4 text-slate-400" />
          )}
        </div>
      </button>

      {/* Accordion Content */}
      {isOpen && (
        <div className="p-4 pt-0 border-t border-slate-100 dark:border-slate-800/60 space-y-3.5 mt-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Food */}
            <div>
              <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1 flex items-center gap-1">
                <Utensils className="w-3.5 h-3.5 text-amber-500" />
                Alimentação (R$)
              </label>
              <input
                type="number"
                min="0"
                step="5"
                placeholder="0,00"
                value={expenses.food || ''}
                onChange={(e) =>
                  onUpdateExpenses({ food: parseFloat(e.target.value) || 0 })
                }
                className="w-full px-3 py-1.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-brand-500 focus:outline-none"
              />
            </div>

            {/* Lodging */}
            <div>
              <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1 flex items-center gap-1">
                <Hotel className="w-3.5 h-3.5 text-indigo-500" />
                Hospedagem (R$)
              </label>
              <input
                type="number"
                min="0"
                step="10"
                placeholder="0,00"
                value={expenses.lodging || ''}
                onChange={(e) =>
                  onUpdateExpenses({ lodging: parseFloat(e.target.value) || 0 })
                }
                className="w-full px-3 py-1.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-brand-500 focus:outline-none"
              />
            </div>

            {/* Driver Per Diem */}
            <div>
              <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1 flex items-center gap-1">
                <UserCheck className="w-3.5 h-3.5 text-emerald-500" />
                Diária Motorista (R$)
              </label>
              <input
                type="number"
                min="0"
                step="10"
                placeholder="0,00"
                value={expenses.driverPerDiem || ''}
                onChange={(e) =>
                  onUpdateExpenses({ driverPerDiem: parseFloat(e.target.value) || 0 })
                }
                className="w-full px-3 py-1.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-brand-500 focus:outline-none"
              />
            </div>

            {/* Maintenance / Wear & tear per km */}
            <div>
              <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1 flex items-center gap-1">
                <Wrench className="w-3.5 h-3.5 text-rose-500" />
                Desgaste / Manut. (R$/km)
              </label>
              <input
                type="number"
                min="0"
                step="0.05"
                placeholder="0,15"
                value={expenses.maintenancePerKm || ''}
                onChange={(e) =>
                  onUpdateExpenses({
                    maintenancePerKm: parseFloat(e.target.value) || 0,
                  })
                }
                className="w-full px-3 py-1.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-brand-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Custom Items List */}
          {expenses.customItems && expenses.customItems.length > 0 && (
            <div className="space-y-1.5 pt-2">
              <span className="text-[11px] font-semibold text-slate-600 dark:text-slate-400 block">
                Itens Personalizados
              </span>
              {expenses.customItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between px-3 py-1.5 bg-slate-50 dark:bg-slate-800/80 rounded-xl text-xs border border-slate-200/60 dark:border-slate-700/60"
                >
                  <span className="text-slate-700 dark:text-slate-300 font-medium">
                    {item.name}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900 dark:text-slate-100">
                      R$ {item.value.toFixed(2)}
                    </span>
                    <button
                      type="button"
                      onClick={() => onRemoveCustomExpense(item.id)}
                      className="text-slate-400 hover:text-rose-500 p-0.5 transition-colors"
                      title="Remover despesa"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Add Custom Item Form */}
          <form onSubmit={handleAddCustom} className="flex gap-2 pt-1">
            <input
              type="text"
              placeholder="Outro custo (ex: Seguro, Descarga...)"
              value={newExpenseName}
              onChange={(e) => setNewExpenseName(e.target.value)}
              className="flex-1 px-3 py-1.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-brand-500 focus:outline-none"
            />
            <input
              type="number"
              min="0"
              step="1"
              placeholder="R$ 0,00"
              value={newExpenseValue}
              onChange={(e) => setNewExpenseValue(e.target.value)}
              className="w-24 px-2.5 py-1.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-brand-500 focus:outline-none"
            />
            <button
              type="submit"
              className="px-3 py-1.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-semibold flex items-center gap-1 shadow-sm transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Adicionar</span>
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
