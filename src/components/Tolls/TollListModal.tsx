import React, { useState } from 'react';
import { TollBooth } from '../../types/trip';
import { formatCurrency } from '../../utils/calculator';
import { searchTollPlazas } from '../../services/tollDetection';
import {
  Layers,
  Plus,
  Trash2,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Search,
  Wand2,
  Info,
} from 'lucide-react';

interface TollListModalProps {
  tollBooths: TollBooth[];
  onUpdateTollPrice: (tollId: string, price: number) => void;
  onToggleToll: (tollId: string) => void;
  onAddCustomToll: (name: string, price: number) => void;
  onRemoveToll: (tollId: string) => void;
  vehicleMultiplier?: number;
  totalDistanceKm?: number;
}

export const TollListModal: React.FC<TollListModalProps> = ({
  tollBooths,
  onUpdateTollPrice,
  onToggleToll,
  onAddCustomToll,
  onRemoveToll,
  vehicleMultiplier = 1.0,
  totalDistanceKm = 0,
}) => {
  const [newTollName, setNewTollName] = useState('');
  const [newTollPrice, setNewTollPrice] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<TollBooth[]>([]);
  const [showSearch, setShowSearch] = useState(false);

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

  const handleSearch = (q: string) => {
    setSearchQuery(q);
    if (q.trim().length >= 2) {
      const results = searchTollPlazas(q, vehicleMultiplier);
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  };

  const handleAddFromSearch = (plaza: TollBooth) => {
    onAddCustomToll(plaza.name, plaza.basePrice);
    setSearchQuery('');
    setSearchResults([]);
    setShowSearch(false);
  };

  // Auto-estimate by mileage
  const handleAutoEstimateByDistance = () => {
    if (totalDistanceKm <= 0) return;
    const estimatedCount = Math.max(1, Math.round(totalDistanceKm / 60)); // ~1 plaza every 60km
    const averageTollPrice = 9.50; // average Brazilian concession rate for passenger car

    for (let i = 1; i <= estimatedCount; i++) {
      onAddCustomToll(
        `Pedágio Estimado ${i} (~km ${Math.round(i * (totalDistanceKm / estimatedCount))})`,
        averageTollPrice
      );
    }
  };

  return (
    <div className="p-4 sm:p-5 rounded-3xl bg-white dark:bg-[#11192e] border border-slate-200/90 dark:border-slate-800/90 shadow-lg shadow-slate-900/5 dark:shadow-black/40 space-y-4 transition-all">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center">
            <Layers className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200">
              Praças de Pedágio ({activeBooths.length} ativas)
            </h3>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-extrabold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/70 px-3 py-1 rounded-xl border border-amber-200 dark:border-amber-900/60 shadow-sm">
            Total: {formatCurrency(totalTollCost)}
          </span>
          <button
            type="button"
            onClick={() => setShowSearch(!showSearch)}
            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-[#162039] dark:hover:bg-[#1e2c4d] text-slate-700 dark:text-slate-300 transition-colors"
            title="Buscar praça na base nacional"
          >
            <Search className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => setShowAddForm(!showAddForm)}
            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-[#162039] dark:hover:bg-[#1e2c4d] text-slate-700 dark:text-slate-300 transition-colors"
            title="Adicionar praça manual"
          >
            <Plus className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* PROMINENT USER NOTICE BANNER */}
      <div className="p-3.5 rounded-2xl bg-gradient-to-r from-amber-500/15 to-orange-500/10 dark:from-amber-950/50 dark:to-orange-950/30 border border-amber-400/40 dark:border-amber-700/60 flex items-start gap-3 text-amber-900 dark:text-amber-200 shadow-sm animate-in fade-in duration-300">
        <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
        <div className="text-xs space-y-1">
          <div className="font-black tracking-wide uppercase text-[11px] text-amber-800 dark:text-amber-300 flex items-center gap-1.5">
            <span>Atenção: Sempre Verifique e Confirme os Valores!</span>
          </div>
          <p className="text-[11px] leading-relaxed text-amber-900/90 dark:text-amber-200/90">
            A detecção identifica as praças automaticamente, mas <strong>as tarifas das concessionárias sofrem reajustes frequentes</strong>. Clique sobre os valores para digitar as tarifas exatas atualizadas da sua viagem.
          </p>
        </div>
      </div>

      {/* Search Plaza in Brazilian Database */}
      {showSearch && (
        <div className="p-3.5 bg-slate-50 dark:bg-[#162039] rounded-2xl space-y-2.5 border border-slate-200 dark:border-slate-700/80">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
              <Search className="w-3.5 h-3.5 text-sky-500" />
              Buscar Praça na Base Nacional (SP, RJ, MG, PR, SC, RS, GO, BA)
            </span>
            <button
              type="button"
              onClick={() => setShowSearch(false)}
              className="text-slate-400 hover:text-slate-600 text-xs"
            >
              Fechar
            </button>
          </div>
          <input
            type="text"
            placeholder="Digite nome da rodovia, praça ou cidade (ex: Dutra, Bandeirantes, Regis, 040, Imigrantes)..."
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#11192e] text-slate-900 dark:text-white focus:ring-2 focus:ring-sky-500 focus:outline-none"
          />
          {searchResults.length > 0 && (
            <ul className="max-h-40 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800 bg-white dark:bg-[#11192e] rounded-xl border border-slate-200 dark:border-slate-700">
              {searchResults.map((result) => (
                <li
                  key={result.id}
                  onClick={() => handleAddFromSearch(result)}
                  className="p-2.5 hover:bg-sky-50 dark:hover:bg-sky-950/60 cursor-pointer flex items-center justify-between text-xs transition-colors"
                >
                  <div>
                    <div className="font-bold text-slate-800 dark:text-slate-100">
                      {result.name}
                    </div>
                    <div className="text-[10px] text-slate-500 dark:text-slate-400">
                      {result.highway}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-black text-amber-600 dark:text-amber-400">
                      {formatCurrency(result.calculatedPrice)}
                    </span>
                    <button
                      type="button"
                      className="px-2 py-1 bg-sky-600 text-white rounded-lg text-[10px] font-bold"
                    >
                      + Adicionar
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {/* Add Custom Toll Form */}
      {showAddForm && (
        <form onSubmit={handleAddSubmit} className="p-3.5 bg-slate-50 dark:bg-[#162039] rounded-2xl space-y-2.5 border border-slate-200 dark:border-slate-700/80">
          <span className="text-xs font-bold text-slate-800 dark:text-slate-200 block">
            Adicionar Praça de Pedágio Manual
          </span>
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              placeholder="Nome da Praça (ex: Pedágio SP-330 Km 80)"
              value={newTollName}
              onChange={(e) => setNewTollName(e.target.value)}
              className="flex-1 px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#11192e] text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
            <input
              type="number"
              step="0.10"
              min="0"
              placeholder="Valor Base (R$)"
              value={newTollPrice}
              onChange={(e) => setNewTollPrice(e.target.value)}
              className="w-full sm:w-32 px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#11192e] text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>
          <div className="flex justify-end gap-2 pt-1">
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="px-3 py-1.5 text-xs font-medium rounded-xl text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 text-xs font-bold rounded-xl bg-amber-600 hover:bg-amber-700 text-white shadow-md"
            >
              Salvar Praça
            </button>
          </div>
        </form>
      )}

      {/* Toll Booths List */}
      {tollBooths.length === 0 ? (
        <div className="py-5 text-center text-xs text-slate-500 dark:text-slate-400 bg-slate-50/60 dark:bg-[#162039]/40 rounded-2xl border border-dashed border-slate-200 dark:border-slate-800 flex flex-col items-center gap-2 p-4">
          <Info className="w-5 h-5 text-slate-400" />
          <span className="font-bold text-slate-700 dark:text-slate-300">
            Nenhum pedágio identificado automaticamente neste trajeto.
          </span>
          <span className="text-[11px] text-slate-400 max-w-sm">
            Se esta viagem passa por rodovias pedagiadas, você pode buscar praças no botão 🔍 acima ou auto-estimar por quilometragem:
          </span>
          {totalDistanceKm > 50 && (
            <button
              type="button"
              onClick={handleAutoEstimateByDistance}
              className="mt-2 px-3.5 py-1.5 rounded-xl bg-amber-50 dark:bg-amber-950/70 border border-amber-300 dark:border-amber-800 text-amber-800 dark:text-amber-300 text-xs font-extrabold flex items-center gap-1.5 shadow-sm hover:scale-105 transition-all"
            >
              <Wand2 className="w-3.5 h-3.5" />
              <span>Auto-Estimar Pedágios ({Math.max(1, Math.round(totalDistanceKm / 60))} praças p/ {Math.round(totalDistanceKm)} km)</span>
            </button>
          )}
        </div>
      ) : (
        <div className="max-h-64 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800/80 pr-1 space-y-1.5">
          {tollBooths.map((booth, idx) => (
            <div
              key={booth.id}
              className={`pt-2.5 pb-2.5 flex items-center justify-between gap-3 transition-opacity ${
                booth.isActive ? 'opacity-100' : 'opacity-40'
              }`}
            >
              {/* Index, Toggle switch & Name */}
              <div className="flex items-center gap-2.5 min-w-0 flex-1">
                <span className="w-5 h-5 rounded-full bg-slate-100 dark:bg-[#162039] text-slate-500 dark:text-slate-400 text-[10px] font-extrabold flex items-center justify-center shrink-0">
                  {idx + 1}
                </span>
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
                  <div className="text-xs font-extrabold text-slate-900 dark:text-slate-100 truncate flex items-center gap-1.5">
                    <span>{booth.name}</span>
                    <span className="text-[9px] font-bold px-1.5 py-0.2 rounded-md bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300">
                      Editar ✏️
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
                  <span className="text-[11px] font-extrabold text-slate-400 mr-1">R$</span>
                  <input
                    type="number"
                    step="0.10"
                    min="0"
                    value={booth.calculatedPrice}
                    onChange={(e) =>
                      onUpdateTollPrice(booth.id, parseFloat(e.target.value) || 0)
                    }
                    className="w-20 px-2 py-1.5 text-xs text-right font-black rounded-xl border border-slate-200 dark:border-slate-700/80 bg-slate-50/70 dark:bg-[#162039] text-slate-900 dark:text-white focus:ring-2 focus:ring-amber-500 focus:outline-none shadow-sm"
                    title="Clique para editar o valor deste pedágio"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => onRemoveToll(booth.id)}
                  className="text-slate-400 hover:text-rose-500 p-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  title="Remover este pedágio"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
