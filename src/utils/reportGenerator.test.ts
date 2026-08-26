import { describe, it, expect } from 'vitest';
import {
  generateWhatsAppReport,
  generateDetailedTextReport,
  ReportData,
} from './reportGenerator';
import { VEHICLE_PRESETS } from '../constants/vehicles';
import { calculateTripCosts } from './calculator';

describe('Report Generator', () => {
  const mockCalculation = calculateTripCosts({
    distanceKm: 420,
    durationMinutes: 310,
    isRoundTrip: true,
    vehicle: VEHICLE_PRESETS.caminhao_3, // 3-axle truck
    customConsumption: 3.5, // 3.5 km/l
    fuelPrice: 6.20,
    fuelType: 'diesel_s10',
    tollBooths: [
      {
        id: 'toll-1',
        name: 'Pedágio Arujá',
        coordinates: { lat: -23.4, lng: -46.3 },
        basePrice: 4.10,
        calculatedPrice: 12.30, // 4.10 * 3
        isActive: true,
      },
      {
        id: 'toll-2',
        name: 'Pedágio Moreira César',
        coordinates: { lat: -22.9, lng: -45.3 },
        basePrice: 16.50,
        calculatedPrice: 49.50, // 16.50 * 3
        isActive: true,
      },
    ],
    extraExpenses: {
      food: 120,
      lodging: 200,
      driverPerDiem: 250,
      maintenancePerKm: 0.15,
      customItems: [{ id: '1', name: 'Chapa/Ajudante', value: 80 }],
    },
  });

  const mockReportData: ReportData = {
    origin: { address: 'São Paulo, SP', coordinates: { lat: -23.55, lng: -46.63 } },
    destination: { address: 'Rio de Janeiro, RJ', coordinates: { lat: -22.9, lng: -43.17 } },
    vehicle: VEHICLE_PRESETS.caminhao_3,
    routeMode: 'fastest',
    fuelType: 'diesel_s10',
    fuelPrice: 6.20,
    customConsumption: 3.5,
    calculation: mockCalculation,
  };

  it('generates WhatsApp report with all essential details requested by user', () => {
    const report = generateWhatsAppReport(mockReportData);

    // Verify key fields
    expect(report).toContain('São Paulo, SP');
    expect(report).toContain('Rio de Janeiro, RJ');
    expect(report).toContain('Caminhão Truck (3 eixos)');
    expect(report).toContain('3.5 km/l');
    expect(report).toContain('Diesel S10');
    expect(report).toContain('840,0 km'); // 420 * 2 for round trip
    expect(report).toContain('Pedágios (4 praças)'); // 2 plazas * 2 for round trip
    expect(report).toContain('Pedágio Arujá');
    expect(report).toContain('Pedágio Moreira César');
    expect(report).toContain('Alimentação');
    expect(report).toContain('CUSTO TOTAL DA VIAGEM');
    expect(report).toContain('Custo por Quilômetro');
  });

  it('generates Detailed Text report with all sections', () => {
    const textReport = generateDetailedTextReport(mockReportData);

    expect(textReport).toContain('RELATÓRIO DE CUSTOS DE VIAGEM E ROTAS');
    expect(textReport).toContain('1. DADOS DO ITINERÁRIO');
    expect(textReport).toContain('2. ESPECIFICAÇÕES DO VEÍCULO E COMBUSTÍVEL');
    expect(textReport).toContain('3. DISCRIMINAÇÃO DE PEDÁGIOS');
    expect(textReport).toContain('4. OUTRAS DESPESAS OPERACIONAIS');
    expect(textReport).toContain('RESUMO FINANCEIRO CONSOLIDADO');
  });
});
