import React, { useState } from 'react';
import { TollBooth } from '../../types/trip';
import { formatCurrency } from '../../utils/calculator';
import {
  Layers,
  Plus,
  Trash2,
  CheckCircle2,
  XCircle,
  AlertCircle,
} from 'lucide-react';

interface TollListModalProps {
  tollBooths: TollBooth[];
  onUpdateTollPrice: (tollId: string, price: number) => void;
  onToggleToll: (tollId: string) => void;
  onAddCustomToll: (name: string, price: number) => void;
  onRemoveToll: (tollId: string) => void;
}

export const TollListModal: React.FC<TollListModalProps> = ({
  tollBooths,
  onUpdateTollPrice,
  onToggleToll,
  onAddCustomToll,
  onRemoveToll,
}) => {
  const [newTollName, setNewTollName] = useState('');
  const [newTollPrice, setNewTollPrice] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);

  const activeBooths = tollBooths.filter((b) => b.isActive);
  const totalTollCost = activeBooths.reduce((s, b) => s + b.calculatedPrice, 0);

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const price = parseFloat(newTollPrice);
    if (!newTollName.trim() || isNaN(price) || price < 0) return;

    onAddCustomToll(newTollName.trim(), price);
    setNewTollName('');
    setNewTollPrice('');
    setShowAddForm(false);
  };

  return (
    <div className="p-4 rounded-2xl bg-white dark:bg-slate-850 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-amber-500" />
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
            Praças de Pedágio ({activeBooths.length}/{tollBooths.length})
          </h3>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-extrabold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/60 px-2.5 py-0.5 rounded-full border border-amber-200 dark:border-amber-900/60">
            Total: {formatCurrency(totalTollCost)}
          </span>
          <button
            type="button"
            onClick={() => setShowAddForm(!showAddForm)}
            className="p-1 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-colors"
            title="Adicionar Pedágio Manual"
          >
            <Plus className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Add Custom Toll Form */}
      {showAddForm && (
        <form onSubmit={handleAddSubmit} className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl space-y-2 border border-slate-200 dark:border-slate-700">
          <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block">
            Adicionar Praça Manual
          </span>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Nome da Praça (ex: Pedágio Rodovia SP-070)"
              value={newTollName}
              onChange={(e) => setNewTollName(e.target.value)}
              className="flex-1 px-2.5 py-1 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-amber-500"
            />
            <input
              type="number"
              step="0.10"
              min="0"
              placeholder="Valor Base (R$)"
              value={newTollPrice}
              onChange={(e) => setNewTollPrice(e.target.value)}
              className="w-28 px-2 py-1 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-amber-500"
            />
          </div>
          <div className="flex justify-end gap-2 pt-1">
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="px-2.5 py-1 text-xs rounded-lg text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-3 py-1 text-xs font-semibold rounded-lg bg-amber-600 hover:bg-amber-700 text-white shadow-sm"
            >
              Salvar Pedágio
            </button>
          </div>
        </form>
      )}

      {/* Toll Booths List */}
      {tollBooths.length === 0 ? (
        <div className="py-4 text-center text-xs text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-dashed border-slate-200 dark:border-slate-800 flex flex-col items-center gap-1.5">
          <AlertCircle className="w-4 h-4 text-slate-400" />
          <span>Nenhuma praça de pedágio detectada para este trajeto.</span>
          <span className="text-[10px] text-slate-400">
            Você pode clicar no botão <strong>+</strong> acima para adicionar manualmente.
          </span>
        </div>
      ) : (
        <div className="max-h-48 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800 pr-1 space-y-1">
          {tollBooths.map((booth) => (
            <div
              key={booth.id}
              className={`pt-1.5 pb-1.5 flex items-center justify-between gap-2 transition-opacity ${
                booth.isActive ? 'opacity-100' : 'opacity-50'
              }`}
            >
              {/* Toggle switch & Name */}
              <div className="flex items-center gap-2 min-w-0 flex-1">
                <button
                  type="button"
                  onClick={() => onToggleToll(booth.id)}
                  className="shrink-0 text-slate-400 hover:text-amber-500 transition-colors"
                  title={booth.isActive ? 'Desativar pedágio' : 'Ativar pedágio'}
                >
                  {booth.isActive ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  ) : (
                    <XCircle className="w-4 h-4 text-slate-400" />
                  )}
                </button>
                <div className="min-w-0 truncate">
                  <div className="text-xs font-medium text-slate-800 dark:text-slate-200 truncate">
                    {booth.name}
                  </div>
                  {booth.highway && (
                    <div className="text-[10px] text-slate-400 truncate">
                      {booth.highway}
                    </div>
                  )}
                </div>
              </div>

              {/* Price input & actions */}
              <div className="flex items-center gap-1.5 shrink-0">
                <div className="relative flex items-center">
                  <span className="text-[10px] text-slate-400 mr-1">R$</span>
                  <input
                    type="number"
                    step="0.10"
                    min="0"
                    value={booth.calculatedPrice}
                    onChange={(e) =>
                      onUpdateTollPrice(booth.id, parseFloat(e.target.value) || 0)
                    }
                    className="w-16 px-1.5 py-0.5 text-xs text-right font-bold rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:ring-1 focus:ring-amber-500 focus:outline-none"
                  />
                </div>
                {booth.isCustom && (
                  <button
                    type="button"
                    onClick={() => onRemoveToll(booth.id)}
                    className="text-slate-400 hover:text-rose-500 p-0.5"
                    title="Excluir"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
