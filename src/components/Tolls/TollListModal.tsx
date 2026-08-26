import React, { useState } from 'react';
import { TollBooth } from '../../types/trip';
import { formatCurrency } from '../../utils/calculator';
import {
  Layers,
  Plus,
  Trash2,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Info,
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
    <div className="p-4 sm:p-5 rounded-3xl bg-white dark:bg-[#11192e] border border-slate-200/90 dark:border-slate-800/90 shadow-lg shadow-slate-900/5 dark:shadow-black/40 space-y-4 transition-all">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center">
            <Layers className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200">
              Praças de Pedágio ({activeBooths.length}/{tollBooths.length})
            </h3>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-extrabold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/70 px-2.5 py-1 rounded-xl border border-amber-200 dark:border-amber-900/60 shadow-sm">
            Total: {formatCurrency(totalTollCost)}
          </span>
          <button
            type="button"
            onClick={() => setShowAddForm(!showAddForm)}
            className="p-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors"
            title="Adicionar Pedágio Manual"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* PROMINENT USER NOTICE BANNER (Requested by user) */}
      {tollBooths.length > 0 && (
        <div className="p-3.5 rounded-2xl bg-amber-500/10 dark:bg-amber-950/40 border border-amber-400/30 dark:border-amber-700/50 flex items-start gap-3 text-amber-900 dark:text-amber-200 animate-in fade-in duration-300">
          <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
          <div className="text-xs space-y-1">
            <div className="font-extrabold tracking-wide uppercase text-[11px] text-amber-700 dark:text-amber-300 flex items-center gap-1.5">
              <span>Atenção Obrigatória: Verifique os Valores!</span>
            </div>
            <p className="text-[11px] leading-relaxed text-amber-900/90 dark:text-amber-200/90">
              As tarifas abaixo são obtidas via APIs e médias de rodovias. <strong>Você deve conferir e digitar os valores exatos atualizados</strong> praticados no dia da viagem para garantir precisão no relatório.
            </p>
          </div>
        </div>
      )}

      {/* Add Custom Toll Form */}
      {showAddForm && (
        <form onSubmit={handleAddSubmit} className="p-3.5 bg-slate-50 dark:bg-slate-900/90 rounded-2xl space-y-2.5 border border-slate-200 dark:border-slate-800">
          <span className="text-xs font-bold text-slate-800 dark:text-slate-200 block">
            Adicionar Praça de Pedágio Manual
          </span>
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              placeholder="Nome da Praça (ex: Pedágio SP-070)"
              value={newTollName}
              onChange={(e) => setNewTollName(e.target.value)}
              className="flex-1 px-3 py-1.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
            <input
              type="number"
              step="0.10"
              min="0"
              placeholder="Valor Base (R$)"
              value={newTollPrice}
              onChange={(e) => setNewTollPrice(e.target.value)}
              className="w-full sm:w-28 px-3 py-1.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>
          <div className="flex justify-end gap-2 pt-1">
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="px-3 py-1 text-xs font-medium rounded-lg text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-3.5 py-1 text-xs font-bold rounded-lg bg-amber-600 hover:bg-amber-700 text-white shadow-sm"
            >
              Salvar Praça
            </button>
          </div>
        </form>
      )}

      {/* Toll Booths List */}
      {tollBooths.length === 0 ? (
        <div className="py-5 text-center text-xs text-slate-500 dark:text-slate-400 bg-slate-50/60 dark:bg-slate-900/40 rounded-2xl border border-dashed border-slate-200 dark:border-slate-800 flex flex-col items-center gap-1.5 p-4">
          <Info className="w-5 h-5 text-slate-400" />
          <span className="font-semibold">Nenhuma praça de pedágio detectada para este trajeto.</span>
          <span className="text-[10px] text-slate-400 max-w-xs">
            Se sua rota possui pedágios não listados, clique no botão <strong>+</strong> acima para adicioná-los.
          </span>
        </div>
      ) : (
        <div className="max-h-56 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800/80 pr-1 space-y-1.5">
          {tollBooths.map((booth) => (
            <div
              key={booth.id}
              className={`pt-2 pb-2 flex items-center justify-between gap-3 transition-opacity ${
                booth.isActive ? 'opacity-100' : 'opacity-40'
              }`}
            >
              {/* Toggle switch & Name */}
              <div className="flex items-center gap-2.5 min-w-0 flex-1">
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
                  <div className="text-xs font-bold text-slate-900 dark:text-slate-100 truncate flex items-center gap-1.5">
                    <span>{booth.name}</span>
                    <span className="text-[9px] font-semibold px-1.5 py-0.2 rounded bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300">
                      Editar valor 👇
                    </span>
                  </div>
                  {booth.highway && (
                    <div className="text-[10px] text-slate-500 dark:text-slate-400 truncate mt-0.5">
                      {booth.highway}
                    </div>
                  )}
                </div>
              </div>

              {/* Price input & actions */}
              <div className="flex items-center gap-2 shrink-0">
                <div className="relative flex items-center">
                  <span className="text-[11px] font-bold text-slate-400 mr-1">R$</span>
                  <input
                    type="number"
                    step="0.10"
                    min="0"
                    value={booth.calculatedPrice}
                    onChange={(e) =>
                      onUpdateTollPrice(booth.id, parseFloat(e.target.value) || 0)
                    }
                    className="w-20 px-2 py-1 text-xs text-right font-extrabold rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-amber-500 focus:outline-none shadow-sm"
                    title="Clique para editar o valor deste pedágio"
                  />
                </div>
                {booth.isCustom && (
                  <button
                    type="button"
                    onClick={() => onRemoveToll(booth.id)}
                    className="text-slate-400 hover:text-rose-500 p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
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
