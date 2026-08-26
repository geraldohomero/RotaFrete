import React, { useState } from 'react';
import {
  generateWhatsAppReport,
  generateDetailedTextReport,
  ReportData,
} from '../../utils/reportGenerator';
import { copyToClipboard } from '../../utils/clipboard';
import {
  X,
  Copy,
  Check,
  FileText,
  MessageSquare,
  ExternalLink,
} from 'lucide-react';

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  reportData: ReportData | null;
  onToast: (text: string, type?: 'success' | 'error') => void;
}

type TabType = 'whatsapp' | 'email';

export const ReportModal: React.FC<ReportModalProps> = ({
  isOpen,
  onClose,
  reportData,
  onToast,
}) => {
  const [activeTab, setActiveTab] = useState<TabType>('whatsapp');
  const [copied, setCopied] = useState(false);

  if (!isOpen || !reportData) return null;

  const whatsappText = generateWhatsAppReport(reportData);
  const detailedText = generateDetailedTextReport(reportData);

  const currentReportText = activeTab === 'whatsapp' ? whatsappText : detailedText;

  const handleCopy = async () => {
    const success = await copyToClipboard(currentReportText);
    if (success) {
      setCopied(true);
      onToast('Relatório copiado para a área de transferência!', 'success');
      setTimeout(() => setCopied(false), 2500);
    } else {
      onToast('Erro ao copiar relatório. Tente selecionar o texto.', 'error');
    }
  };

  const handleShareWhatsApp = () => {
    const encoded = encodeURIComponent(whatsappText);
    window.open(`https://api.whatsapp.com/send?text=${encoded}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col max-h-[90vh] overflow-hidden">
        {/* Modal Header */}
        <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-brand-500/10 text-brand-600 dark:text-brand-400 flex items-center justify-center">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-slate-100">
                Relatório de Custos da Viagem
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Pronto para copiar, colar e enviar para clientes ou equipe
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selection */}
        <div className="px-5 pt-3 flex gap-2 border-b border-slate-100 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/50">
          <button
            type="button"
            onClick={() => setActiveTab('whatsapp')}
            className={`pb-2.5 px-3 text-xs font-bold flex items-center gap-1.5 border-b-2 transition-all ${
              activeTab === 'whatsapp'
                ? 'border-emerald-500 text-emerald-600 dark:text-emerald-400'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-300'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>Formato WhatsApp / Redes</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('email')}
            className={`pb-2.5 px-3 text-xs font-bold flex items-center gap-1.5 border-b-2 transition-all ${
              activeTab === 'email'
                ? 'border-brand-500 text-brand-600 dark:text-brand-400'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-300'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Formato Texto / E-mail</span>
          </button>
        </div>

        {/* Report Preview Content */}
        <div className="p-5 flex-1 overflow-y-auto bg-slate-50 dark:bg-slate-950">
          <div className="relative">
            <pre className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 font-mono text-xs text-slate-800 dark:text-slate-200 whitespace-pre-wrap select-all leading-relaxed shadow-inner">
              {currentReportText}
            </pre>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-wrap items-center justify-between gap-3">
          <button
            type="button"
            onClick={handleShareWhatsApp}
            className="px-4 py-2 text-xs font-bold rounded-xl bg-emerald-50 text-emerald-700 hover:bg-emerald-100 dark:bg-emerald-950/60 dark:text-emerald-300 dark:hover:bg-emerald-950 border border-emerald-200 dark:border-emerald-900/60 flex items-center gap-1.5 transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Abrir no WhatsApp Web</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold rounded-xl text-slate-600 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              Fechar
            </button>
            <button
              type="button"
              onClick={handleCopy}
              className="px-5 py-2 text-xs font-bold rounded-xl bg-brand-600 hover:bg-brand-700 text-white shadow-md shadow-brand-600/20 flex items-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-300" />
                  <span>Copiado com Sucesso!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Copiar Relatório</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
