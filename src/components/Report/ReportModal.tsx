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
  AlertTriangle,
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full max-w-2xl bg-white dark:bg-[#11192e] rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col max-h-[90vh] overflow-hidden">
        {/* Modal Header */}
        <div className="p-5 border-b border-slate-200/80 dark:border-slate-800/80 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-sky-500/10 text-sky-500 flex items-center justify-center">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-black text-slate-900 dark:text-white">
                Relatório de Custos da Viagem
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Pronto para copiar, colar e compartilhar com clientes ou motoristas
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

        {/* Toll Verification Reminder inside modal */}
        <div className="mx-5 mt-4 p-3 rounded-2xl bg-amber-500/10 border border-amber-400/20 text-amber-800 dark:text-amber-200 text-xs flex items-center gap-2.5">
          <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0" />
          <span className="text-[11px]">
            Lembrete: Certifique-se de que os valores dos pedágios e preços de combustível correspondem às tarifas exatas do seu trajeto.
          </span>
        </div>

        {/* Tab Selection */}
        <div className="px-5 pt-3 flex gap-2 border-b border-slate-100 dark:border-slate-800/80 bg-slate-50/50 dark:bg-[#0c1222]/50">
          <button
            type="button"
            onClick={() => setActiveTab('whatsapp')}
            className={`pb-2.5 px-3.5 text-xs font-bold flex items-center gap-2 border-b-2 transition-all ${
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
            className={`pb-2.5 px-3.5 text-xs font-bold flex items-center gap-2 border-b-2 transition-all ${
              activeTab === 'email'
                ? 'border-sky-500 text-sky-600 dark:text-sky-400'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-300'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Formato Texto / E-mail</span>
          </button>
        </div>

        {/* Report Preview Content */}
        <div className="p-5 flex-1 overflow-y-auto bg-slate-50/60 dark:bg-[#090d17]">
          <div className="relative">
            <pre className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#11192e] border border-slate-200 dark:border-slate-800 font-mono text-xs text-slate-800 dark:text-slate-200 whitespace-pre-wrap select-all leading-relaxed shadow-inner">
              {currentReportText}
            </pre>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="p-4 sm:p-5 border-t border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-[#11192e] flex flex-wrap items-center justify-between gap-3">
          <button
            type="button"
            onClick={handleShareWhatsApp}
            className="px-4 py-2.5 text-xs font-bold rounded-2xl bg-emerald-50 text-emerald-700 hover:bg-emerald-100 dark:bg-emerald-950/70 dark:text-emerald-300 dark:hover:bg-emerald-900/80 border border-emerald-200 dark:border-emerald-800/60 flex items-center gap-2 transition-all shadow-sm"
          >
            <ExternalLink className="w-4 h-4" />
            <span>Abrir no WhatsApp Web</span>
          </button>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 text-xs font-semibold rounded-2xl text-slate-600 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              Fechar
            </button>
            <button
              type="button"
              onClick={handleCopy}
              className="px-6 py-2.5 text-xs font-extrabold rounded-2xl bg-sky-600 hover:bg-sky-500 text-white shadow-lg shadow-sky-600/25 flex items-center gap-2 transition-all hover:scale-105 active:scale-95"
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
