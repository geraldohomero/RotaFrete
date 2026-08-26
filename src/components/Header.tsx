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
    <header className="sticky top-0 z-30 w-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo & Name */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 to-sky-400 flex items-center justify-center text-white shadow-md shadow-brand-500/20">
            <Truck className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-brand-600 via-sky-500 to-indigo-600 dark:from-brand-400 dark:via-sky-300 dark:to-indigo-300 bg-clip-text text-transparent">
                RotaFrete
              </span>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-brand-50 text-brand-700 dark:bg-brand-950/60 dark:text-brand-300 border border-brand-200 dark:border-brand-800/60">
                PRO
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 hidden sm:block">
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
            className="p-2 rounded-xl text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title="Configurações de API"
            aria-label="Configurações"
          >
            <Settings className="w-5 h-5" />
          </button>

          {/* Dark Mode Switch */}
          <button
            type="button"
            onClick={onToggleDarkMode}
            className="p-2 rounded-xl text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title={isDark ? 'Mudar para Modo Claro' : 'Mudar para Modo Escuro'}
            aria-label="Alternar Tema"
          >
            {isDark ? (
              <Sun className="w-5 h-5 text-amber-400 animate-in spin-in-180 duration-300" />
            ) : (
              <Moon className="w-5 h-5 text-slate-700 animate-in spin-in-180 duration-300" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
