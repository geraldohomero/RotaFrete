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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Key className="w-5 h-5 text-brand-500" />
            <h2 className="text-base font-bold text-slate-900 dark:text-slate-100">
              Configurações de Mapa & APIs
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Form */}
        <form onSubmit={handleSave} className="p-5 space-y-4">
          <div className="p-3 bg-brand-50/70 dark:bg-brand-950/40 border border-brand-100 dark:border-brand-900/40 rounded-2xl text-xs text-brand-900 dark:text-brand-200 flex items-start gap-2">
            <Info className="w-4 h-4 text-brand-500 shrink-0 mt-0.5" />
            <span>
              O <strong>OpenStreetMap + OSRM</strong> já vem ativo gratuitamente e não requer chave. Se preferir usar o Google Maps Platform, insira sua chave abaixo.
            </span>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Google Maps API Key (Opcional)
            </label>
            <input
              type="password"
              placeholder="AIzaSy..."
              value={keyInput}
              onChange={(e) => setKeyInput(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-brand-500 focus:outline-none"
            />
            <p className="text-[10px] text-slate-400 mt-1">
              A chave é salva apenas localmente no seu navegador (`localStorage`).
            </p>
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-bold rounded-xl bg-brand-600 hover:bg-brand-700 text-white shadow-sm"
            >
              Salvar Configuração
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
