import {
  TripCalculationResult,
  VehicleConfig,
  RouteMode,
  LocationPoint,
  FuelType,
} from '../types/trip';
import { formatCurrency, formatDistance, formatDuration } from './calculator';
import { DEFAULT_FUEL_PRICES } from '../constants/vehicles';

export interface ReportData {
  origin: LocationPoint;
  destination: LocationPoint;
  vehicle: VehicleConfig;
  routeMode: RouteMode;
  fuelType: FuelType;
  fuelPrice: number;
  customConsumption: number;
  calculation: TripCalculationResult;
  notes?: string;
}

const ROUTE_MODE_LABELS: Record<RouteMode, string> = {
  fastest: 'Mais Rápida / Eficiente',
  shortest: 'Mais Curta',
  avoid_tolls: 'Evitar Pedágios (Sem Pedágio)',
};

/**
 * Formats report optimized for WhatsApp and instant messaging with emojis and bold text
 */
export function generateWhatsAppReport(data: ReportData): string {
  const {
    origin,
    destination,
    vehicle,
    routeMode,
    fuelType,
    fuelPrice,
    customConsumption,
    calculation,
    notes,
  } = data;

  const fuelLabel = DEFAULT_FUEL_PRICES[fuelType]?.label || fuelType;
  const activeTolls = calculation.tollBoothsList.filter((b) => b.isActive);

  let tollsBreakdown = '';
  if (activeTolls.length > 0) {
    tollsBreakdown =
      '\n' +
      activeTolls
        .map(
          (booth, idx) =>
            `   ${idx + 1}. ${booth.name}: ${formatCurrency(booth.calculatedPrice)}`
        )
        .join('\n');
    if (calculation.isRoundTrip) {
      tollsBreakdown += `\n   _(Valores calculados em dobro para Ida e Volta)_`;
    }
  }

  let extrasBreakdown = '';
  const extrasList: string[] = [];
  if (calculation.foodCost > 0) extrasList.push(`• Alimentação: ${formatCurrency(calculation.foodCost)}`);
  if (calculation.lodgingCost > 0) extrasList.push(`• Hospedagem: ${formatCurrency(calculation.lodgingCost)}`);
  if (calculation.driverPerDiemCost > 0) extrasList.push(`• Diária Motorista: ${formatCurrency(calculation.driverPerDiemCost)}`);
  if (calculation.maintenanceCost > 0) extrasList.push(`• Desgaste / Manutenção: ${formatCurrency(calculation.maintenanceCost)}`);
  if (calculation.customExpensesTotal > 0) {
    extrasList.push(`• Outras Despesas: ${formatCurrency(calculation.customExpensesTotal)}`);
  }

  if (extrasList.length > 0) {
    extrasBreakdown = `\n📋 *OUTROS GASTOS*\n${extrasList.join('\n')}\n`;
  }

  return `🚛 *RELATÓRIO DETALHADO DE VIAGEM - ROTAFRETE*
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📍 *Origem:* ${origin.address || 'Não informada'}
🏁 *Destino:* ${destination.address || 'Não informado'}
🔄 *Trajeto:* ${calculation.isRoundTrip ? 'Ida e Volta (Duplo percurso)' : 'Apenas Ida'}
🛣️ *Modalidade de Rota:* ${ROUTE_MODE_LABELS[routeMode]}
⏱️ *Tempo Estimado:* ${formatDuration(calculation.totalDurationMinutes)}
📏 *Distância Total:* ${formatDistance(calculation.totalDistanceKm)}${calculation.isRoundTrip ? ` (${formatDistance(calculation.oneWayDistanceKm)} por trecho)` : ''}

🚙 *DADOS DO VEÍCULO*
• Veículo: ${vehicle.name} (${vehicle.axles} ${vehicle.axles === 1 ? 'eixo' : 'eixos'})
• Consumo Médio: ${customConsumption.toFixed(1)} km/l
• Combustível: ${fuelLabel} (${formatCurrency(fuelPrice)}/L)
• Combustível Necessário: ${calculation.fuelVolumeNeeded.toFixed(1)} L

💰 *DETALHAMENTO DOS CUSTOS*
⛽ *Combustível Total:* ${formatCurrency(calculation.fuelTotalCost)}
🛣️ *Pedágios (${calculation.tollCount} ${calculation.tollCount === 1 ? 'praça' : 'praças'}):* ${formatCurrency(calculation.tollTotalCost)}${tollsBreakdown}
${extrasBreakdown}━━━━━━━━━━━━━━━━━━━━━━━━━━━━
💵 *CUSTO TOTAL DA VIAGEM:* ${formatCurrency(calculation.grandTotalCost)}
📊 *Custo por Quilômetro:* ${formatCurrency(calculation.costPerKm)} / km${calculation.isRoundTrip ? `\n🏷️ *Custo por Trecho:* ${formatCurrency(calculation.costPerOneWayLeg)}` : ''}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━${notes ? `\n📝 *Observações:* ${notes}\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━` : ''}
_Calculado via RotaFrete - Calculadora de Custos de Viagem_`;
}

/**
 * Formats report for corporate emails or formal freight invoices
 */
export function generateDetailedTextReport(data: ReportData): string {
  const {
    origin,
    destination,
    vehicle,
    routeMode,
    fuelType,
    fuelPrice,
    customConsumption,
    calculation,
    notes,
  } = data;

  const fuelLabel = DEFAULT_FUEL_PRICES[fuelType]?.label || fuelType;
  const activeTolls = calculation.tollBoothsList.filter((b) => b.isActive);

  return `================================================================================
                    RELATÓRIO DE CUSTOS DE VIAGEM E ROTAS
                                  ROTAFRETE
================================================================================

1. DADOS DO ITINERÁRIO
--------------------------------------------------------------------------------
Origem:               ${origin.address || 'Não informada'}
Destino:              ${destination.address || 'Não informado'}
Tipo de Trajeto:      ${calculation.isRoundTrip ? 'Ida e Volta' : 'Apenas Ida'}
Modo de Rota:         ${ROUTE_MODE_LABELS[routeMode]}
Distância Total:      ${formatDistance(calculation.totalDistanceKm)}
Distância Unitária:   ${formatDistance(calculation.oneWayDistanceKm)}
Tempo Estimado:       ${formatDuration(calculation.totalDurationMinutes)}

2. ESPECIFICAÇÕES DO VEÍCULO E COMBUSTÍVEL
--------------------------------------------------------------------------------
Categoria/Veículo:    ${vehicle.name}
Número de Eixos:      ${vehicle.axles}
Fator de Pedágio:     ${vehicle.tollMultiplier.toFixed(1)}x
Tipo de Combustível:  ${fuelLabel}
Preço do Combustível: ${formatCurrency(fuelPrice)}
Consumo Médio:        ${customConsumption.toFixed(1)} km/l
Consumo Estimado:     ${calculation.fuelVolumeNeeded.toFixed(2)} Litros
Custo Combustível:    ${formatCurrency(calculation.fuelTotalCost)}

3. DISCRIMINAÇÃO DE PEDÁGIOS
--------------------------------------------------------------------------------
Total de Praças:      ${calculation.tollCount}
Custo Total Pedágios: ${formatCurrency(calculation.tollTotalCost)}
${
  activeTolls.length > 0
    ? activeTolls
        .map(
          (b, i) =>
            `  [${i + 1}] ${b.name.padEnd(40, ' ')} Tarifa: ${formatCurrency(b.calculatedPrice)}`
        )
        .join('\n')
    : '  Nenhum pedágio tarifado nesta rota.'
}

4. OUTRAS DESPESAS OPERACIONAIS
--------------------------------------------------------------------------------
Alimentação:          ${formatCurrency(calculation.foodCost)}
Hospedagem:           ${formatCurrency(calculation.lodgingCost)}
Diária de Motorista:  ${formatCurrency(calculation.driverPerDiemCost)}
Manutenção/Desgaste:  ${formatCurrency(calculation.maintenanceCost)}
Outros Gastos Extras: ${formatCurrency(calculation.customExpensesTotal)}
Subtotal Extras:      ${formatCurrency(calculation.extraExpensesTotal)}

================================================================================
RESUMO FINANCEIRO CONSOLIDADO
================================================================================
Combustível:          ${formatCurrency(calculation.fuelTotalCost)}
Pedágios:             ${formatCurrency(calculation.tollTotalCost)}
Despesas Extras:      ${formatCurrency(calculation.extraExpensesTotal)}
--------------------------------------------------------------------------------
VALOR TOTAL ESTIMADO: ${formatCurrency(calculation.grandTotalCost)}
CUSTO MÉDIO POR KM:   ${formatCurrency(calculation.costPerKm)} / km
${calculation.isRoundTrip ? `VALOR POR TRECHO:     ${formatCurrency(calculation.costPerOneWayLeg)}\n` : ''}================================================================================
${notes ? `Observações: ${notes}\n================================================================================\n` : ''}Documento gerado automaticamente por RotaFrete em ${new Date().toLocaleDateString('pt-BR')} às ${new Date().toLocaleTimeString('pt-BR')}.
`;
}
