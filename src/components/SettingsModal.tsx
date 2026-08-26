import React, { useState } from 'react';
import { X, Key, Info } from 'lucide-react';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  googleApiKey: string;
  onSaveGoogleApiKey: (key: string) => void;
  onToast: (text: string, type?: 'success' | 'error') => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  googleApiKey,
  onSaveGoogleApiKey,
  onToast,
}) => {
  const [keyInput, setKeyInput] = useState(googleApiKey);

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveGoogleApiKey(keyInput.trim());
    onToast('Configurações salvas!', 'success');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-white dark:bg-[#11192e] rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b border-slate-200/80 dark:border-slate-800/80 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-sky-500/10 text-sky-500 flex items-center justify-center">
              <Key className="w-4 h-4" />
            </div>
            <h2 className="text-base font-black text-slate-900 dark:text-white">
              Configurações de Mapa & APIs
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Form */}
        <form onSubmit={handleSave} className="p-5 space-y-4">
          <div className="p-3.5 bg-sky-50/70 dark:bg-sky-950/40 border border-sky-100 dark:border-sky-900/40 rounded-2xl text-xs text-sky-950 dark:text-sky-200 flex items-start gap-2.5">
            <Info className="w-4 h-4 text-sky-500 shrink-0 mt-0.5" />
            <span className="leading-relaxed">
              O <strong>OpenStreetMap + OSRM + Overpass</strong> já vem ativo gratuitamente e sem limites. Se desejar utilizar a Google Maps Platform, insira sua chave abaixo.
            </span>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
              Google Maps API Key (Opcional)
            </label>
            <input
              type="password"
              placeholder="AIzaSy..."
              value={keyInput}
              onChange={(e) => setKeyInput(e.target.value)}
              className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700/80 bg-slate-50/70 dark:bg-[#162039] text-slate-900 dark:text-white focus:ring-2 focus:ring-sky-500 focus:outline-none shadow-sm"
            />
            <p className="text-[10px] text-slate-400 mt-1.5">
              Sua chave é salva apenas localmente no seu navegador (`localStorage`).
            </p>
          </div>

          <div className="flex justify-end gap-2.5 pt-3 border-t border-slate-100 dark:border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-bold rounded-xl bg-sky-600 hover:bg-sky-500 text-white shadow-md shadow-sky-600/20 transition-all"
            >
              Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
