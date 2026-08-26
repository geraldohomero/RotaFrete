import React from 'react';
import { Truck, Moon, Sun, Settings } from 'lucide-react';

interface HeaderProps {
  isDark: boolean;
  onToggleDarkMode: () => void;
  onOpenSettings: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  isDark,
  onToggleDarkMode,
  onOpenSettings,
}) => {
  return (
    <header className="sticky top-0 z-30 w-full bg-white/80 dark:bg-[#0c1222]/90 backdrop-blur-xl border-b border-slate-200/80 dark:border-slate-800/80 shadow-sm transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo & Name */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-sky-500 via-brand-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-sky-500/25 ring-1 ring-white/20">
            <Truck className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-black text-xl tracking-tight bg-gradient-to-r from-slate-900 via-brand-600 to-sky-600 dark:from-white dark:via-sky-300 dark:to-indigo-300 bg-clip-text text-transparent">
                RotaFrete
              </span>
              <span className="text-[10px] uppercase font-extrabold tracking-widest px-2 py-0.5 rounded-full bg-sky-100 text-sky-800 dark:bg-sky-950/80 dark:text-sky-300 border border-sky-200 dark:border-sky-800/80">
                PRO
              </span>
            </div>
            <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400 hidden sm:block">
              Calculadora de Custos de Viagem, Pedágios e Combustível
            </p>
          </div>
        </div>

        {/* Header Actions */}
        <div className="flex items-center gap-2">
          {/* Settings button */}
          <button
            type="button"
            onClick={onOpenSettings}
            className="p-2.5 rounded-2xl text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800/80 border border-transparent dark:border-slate-800 transition-all"
            title="Configurações de API"
            aria-label="Configurações"
          >
            <Settings className="w-4 h-4" />
          </button>

          {/* Dark Mode Switch */}
          <button
            type="button"
            onClick={onToggleDarkMode}
            className="flex items-center gap-2 px-3 py-1.5 rounded-2xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800/90 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200/80 dark:border-slate-700/80 shadow-sm transition-all hover:scale-105 active:scale-95"
            title={isDark ? 'Mudar para Modo Claro' : 'Mudar para Modo Escuro'}
            aria-label="Alternar Tema"
          >
            {isDark ? (
              <>
                <Sun className="w-4 h-4 text-amber-400" />
                <span className="text-xs font-bold">Claro</span>
              </>
            ) : (
              <>
                <Moon className="w-4 h-4 text-slate-700" />
                <span className="text-xs font-bold">Escuro</span>
              </>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
