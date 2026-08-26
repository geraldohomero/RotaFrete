import React, { useEffect } from 'react';
import { CheckCircle2, AlertCircle, X } from 'lucide-react';

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info';
  text: string;
}

interface ToastProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export const ToastContainer: React.FC<ToastProps> = ({ toasts, onDismiss }) => {
  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 pointer-events-none max-w-sm w-full px-4">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onDismiss={onDismiss} />
      ))}
    </div>
  );
};

const ToastItem: React.FC<{ toast: ToastMessage; onDismiss: (id: string) => void }> = ({
  toast,
  onDismiss,
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onDismiss(toast.id);
    }, 3200);
    return () => clearTimeout(timer);
  }, [toast.id, onDismiss]);

  const bgStyles = {
    success:
      'bg-emerald-600 text-white border-emerald-500 shadow-emerald-500/20',
    error: 'bg-rose-600 text-white border-rose-500 shadow-rose-500/20',
    info: 'bg-brand-600 text-white border-brand-500 shadow-brand-500/20',
  };

  const icons = {
    success: <CheckCircle2 className="w-5 h-5 shrink-0" />,
    error: <AlertCircle className="w-5 h-5 shrink-0" />,
    info: <CheckCircle2 className="w-5 h-5 shrink-0" />,
  };

  return (
    <div
      className={`pointer-events-auto flex items-center justify-between gap-3 p-3.5 rounded-2xl shadow-xl border text-sm font-semibold transition-all animate-in slide-in-from-bottom-5 duration-200 ${
        bgStyles[toast.type]
      }`}
    >
      <div className="flex items-center gap-2.5">
        {icons[toast.type]}
        <span>{toast.text}</span>
      </div>
      <button
        type="button"
        onClick={() => onDismiss(toast.id)}
        className="p-1 hover:bg-white/20 rounded-lg transition-colors"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};
