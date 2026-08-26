import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { AddressInput } from './components/Form/AddressInput';
import { VehicleSelector } from './components/Form/VehicleSelector';
import { RouteOptions } from './components/Form/RouteOptions';
import { ExtraExpensesSection } from './components/Form/ExtraExpensesSection';
import { TollListModal } from './components/Tolls/TollListModal';
import { SummaryCards } from './components/Results/SummaryCards';
import { CostBreakdownBar } from './components/Results/CostBreakdownBar';
import { TripMap } from './components/Map/TripMap';
import { ReportModal } from './components/Report/ReportModal';
import { SettingsModal } from './components/SettingsModal';
import { ToastContainer, ToastMessage } from './components/Toast';
import { useDarkMode } from './hooks/useDarkMode';
import { useTripCalculator } from './hooks/useTripCalculator';
import { copyToClipboard } from './utils/clipboard';
import { generateWhatsAppReport, ReportData } from './utils/reportGenerator';
import { AlertTriangle } from 'lucide-react';

export default function App() {
  const { isDark, toggleDarkMode } = useDarkMode();
  const trip = useTripCalculator();

  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (text: string, type: 'success' | 'error' | 'info' = 'info') => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substring(2, 5)}`;
    setToasts((prev) => [...prev, { id, text, type }]);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Set default initial origin & destination on first load to showcase the app instantly
  useEffect(() => {
    if (!trip.origin && !trip.destination) {
      trip.setOrigin({
        address: 'São Paulo, SP, Brasil',
        coordinates: { lat: -23.5505, lng: -46.6333 },
      });
      trip.setDestination({
        address: 'Rio de Janeiro, RJ, Brasil',
        coordinates: { lat: -22.9068, lng: -43.1729 },
      });
    }
  }, []);

  const reportData: ReportData | null =
    trip.origin && trip.destination
      ? {
          origin: trip.origin,
          destination: trip.destination,
          vehicle: trip.vehicle,
          routeMode: trip.routeMode,
          fuelType: trip.fuelType,
          fuelPrice: trip.fuelPrice,
          customConsumption: trip.customConsumption,
          calculation: trip.calculationResult,
        }
      : null;

  // Handle Quick 1-Click WhatsApp copy
  const handleQuickCopyWhatsApp = async () => {
    if (!reportData) return;
    const text = generateWhatsAppReport(reportData);
    const success = await copyToClipboard(text);
    if (success) {
      addToast('Relatório copiado para o WhatsApp!', 'success');
    } else {
      addToast('Erro ao copiar. Tente pelo modal de relatório.', 'error');
    }
  };

  const hasRoute = Boolean(trip.origin && trip.destination && trip.distanceKm > 0);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-[#090d16] text-slate-900 dark:text-slate-100 transition-colors duration-200">
      {/* App Navigation Header */}
      <Header
        isDark={isDark}
        onToggleDarkMode={toggleDarkMode}
        onOpenSettings={() => setIsSettingsModalOpen(true)}
      />

      {/* Main Grid Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        {trip.routeError && (
          <div className="mb-4 p-4 bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-900/60 rounded-3xl text-xs font-semibold text-rose-800 dark:text-rose-200 flex items-center gap-2.5 shadow-sm">
            <AlertTriangle className="w-5 h-5 text-rose-500 shrink-0" />
            <span>{trip.routeError}</span>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Form Controls & Inputs (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            {/* 1. Origin & Destination Autocomplete */}
            <div className="p-4 sm:p-5 rounded-3xl bg-white dark:bg-[#11192e] border border-slate-200/90 dark:border-slate-800/90 shadow-lg shadow-slate-900/5 dark:shadow-black/40">
              <AddressInput
                origin={trip.origin}
                destination={trip.destination}
                onSelectOrigin={trip.setOrigin}
                onSelectDestination={trip.setDestination}
                onSwap={trip.swapOriginDestination}
                googleApiKey={trip.googleApiKey}
              />
            </div>

            {/* 2. Route Mode Tabs & Round-trip Switch */}
            <RouteOptions
              routeMode={trip.routeMode}
              onChangeRouteMode={trip.setRouteMode}
              isRoundTrip={trip.isRoundTrip}
              onToggleRoundTrip={trip.setIsRoundTrip}
            />

            {/* 3. Vehicle & Fuel Configurator */}
            <VehicleSelector
              selectedVehicle={trip.vehicle}
              onSelectVehicle={trip.setVehicle}
              customConsumption={trip.customConsumption}
              onChangeConsumption={trip.setCustomConsumption}
              fuelType={trip.fuelType}
              onChangeFuelType={trip.setFuelType}
              fuelPrice={trip.fuelPrice}
              onChangeFuelPrice={trip.setFuelPrice}
            />

            {/* 4. Tolls Manager & List */}
            <TollListModal
              tollBooths={trip.tollBooths}
              onUpdateTollPrice={trip.updateTollPrice}
              onToggleToll={trip.toggleTollActive}
              onAddCustomToll={trip.addCustomToll}
              onRemoveToll={trip.removeToll}
              vehicleMultiplier={trip.vehicle.tollMultiplier}
              totalDistanceKm={trip.distanceKm}
            />

            {/* 5. Extra Expenses Accordion */}
            <ExtraExpensesSection
              expenses={trip.extraExpenses}
              onUpdateExpenses={trip.updateExtraExpenses}
              onAddCustomExpense={trip.addCustomExpense}
              onRemoveCustomExpense={trip.removeCustomExpense}
            />
          </div>

          {/* Right Column: Summary, Visual Breakdown & Map (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            {/* Top Summary Metric Cards & Copy Buttons */}
            <SummaryCards
              calculation={trip.calculationResult}
              onOpenReportModal={() => setIsReportModalOpen(true)}
              onQuickCopyWhatsApp={handleQuickCopyWhatsApp}
              onReset={trip.resetForm}
              hasRoute={hasRoute}
            />

            {/* Visual Cost Breakdown Bar */}
            {hasRoute && (
              <CostBreakdownBar calculation={trip.calculationResult} />
            )}

            {/* Interactive Leaflet Map */}
            <div className="w-full h-[460px] lg:h-[520px]">
              <TripMap
                origin={trip.origin}
                destination={trip.destination}
                routeCoordinates={trip.routeCoordinates}
                tollBooths={trip.tollBooths}
                routeMode={trip.routeMode}
                isLoading={trip.isLoadingRoute}
                isDark={isDark}
                onToggleToll={trip.toggleTollActive}
              />
            </div>
          </div>
        </div>
      </main>

      {/* Report Modal */}
      <ReportModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        reportData={reportData}
        onToast={addToast}
      />

      {/* Settings Modal */}
      <SettingsModal
        isOpen={isSettingsModalOpen}
        onClose={() => setIsSettingsModalOpen(false)}
        googleApiKey={trip.googleApiKey}
        onSaveGoogleApiKey={trip.updateGoogleApiKey}
        onToast={addToast}
      />

      {/* Floating Toast Alerts */}
      <ToastContainer toasts={toasts} onDismiss={removeToast} />
    </div>
  );
}
