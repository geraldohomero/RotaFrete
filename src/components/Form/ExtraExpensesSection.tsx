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
    <div className="rounded-3xl bg-white dark:bg-[#11192e] border border-slate-200/90 dark:border-slate-800/90 shadow-lg shadow-slate-900/5 dark:shadow-black/40 overflow-hidden transition-all">
      {/* Header / Accordion trigger */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-4 sm:p-5 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/30 text-left transition-colors"
      >
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-xl bg-purple-500/10 text-purple-500 flex items-center justify-center">
            <Receipt className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200">
              Outros Gastos & Diárias
            </h3>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Alimentação, hospedagem, diária de motorista, manutenção
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {totalExtras > 0 && (
            <span className="text-xs font-extrabold text-purple-600 dark:text-purple-300 bg-purple-50 dark:bg-purple-950/70 border border-purple-200 dark:border-purple-900/60 px-3 py-1 rounded-xl shadow-sm">
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
        <div className="p-4 sm:p-5 pt-0 border-t border-slate-100 dark:border-slate-800/80 space-y-4 mt-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Food */}
            <div>
              <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1 flex items-center gap-1.5">
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
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700/80 bg-slate-50/70 dark:bg-[#162039] text-slate-900 dark:text-white focus:ring-2 focus:ring-sky-500 focus:outline-none"
              />
            </div>

            {/* Lodging */}
            <div>
              <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1 flex items-center gap-1.5">
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
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700/80 bg-slate-50/70 dark:bg-[#162039] text-slate-900 dark:text-white focus:ring-2 focus:ring-sky-500 focus:outline-none"
              />
            </div>

            {/* Driver Per Diem */}
            <div>
              <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1 flex items-center gap-1.5">
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
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700/80 bg-slate-50/70 dark:bg-[#162039] text-slate-900 dark:text-white focus:ring-2 focus:ring-sky-500 focus:outline-none"
              />
            </div>

            {/* Maintenance / Wear & tear per km */}
            <div>
              <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1 flex items-center gap-1.5">
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
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700/80 bg-slate-50/70 dark:bg-[#162039] text-slate-900 dark:text-white focus:ring-2 focus:ring-sky-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Custom Items List */}
          {expenses.customItems && expenses.customItems.length > 0 && (
            <div className="space-y-2 pt-2">
              <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block">
                Itens Personalizados Adicionados
              </span>
              {expenses.customItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between px-3 py-2 bg-slate-50 dark:bg-[#162039] rounded-xl text-xs border border-slate-200/80 dark:border-slate-700/60"
                >
                  <span className="text-slate-800 dark:text-slate-200 font-semibold">
                    {item.name}
                  </span>
                  <div className="flex items-center gap-2.5">
                    <span className="font-extrabold text-slate-900 dark:text-white">
                      R$ {item.value.toFixed(2)}
                    </span>
                    <button
                      type="button"
                      onClick={() => onRemoveCustomExpense(item.id)}
                      className="text-slate-400 hover:text-rose-500 p-1 rounded-lg hover:bg-slate-200/50 dark:hover:bg-slate-700/50 transition-colors"
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
              className="flex-1 px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700/80 bg-slate-50/70 dark:bg-[#162039] text-slate-900 dark:text-white focus:ring-2 focus:ring-sky-500 focus:outline-none"
            />
            <input
              type="number"
              min="0"
              step="1"
              placeholder="R$ 0,00"
              value={newExpenseValue}
              onChange={(e) => setNewExpenseValue(e.target.value)}
              className="w-24 px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700/80 bg-slate-50/70 dark:bg-[#162039] text-slate-900 dark:text-white focus:ring-2 focus:ring-sky-500 focus:outline-none"
            />
            <button
              type="submit"
              className="px-3.5 py-2 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-sky-600/20 transition-all"
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
