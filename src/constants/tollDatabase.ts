import { Coordinates } from '../types/trip';

export interface TollPlazaData {
  id: string;
  name: string;
  highway: string;
  concessionaire: string;
  state: string;
  coordinates: Coordinates;
  basePrice: number; // Base price for passenger vehicle (1.0x)
  isFreeFlow?: boolean;
}

export const COMPREHENSIVE_BRAZILIAN_TOLLS: TollPlazaData[] = [
  // ==========================================
  // SÃO PAULO - SISTEMA ANHANGUERA-BANDEIRANTES (CCR AutoBAn)
  // ==========================================
  { id: 'sp-band-caieiras', name: 'Pedágio Caieiras (Bandeirantes)', highway: 'SP-348 Rod. dos Bandeirantes', concessionaire: 'CCR AutoBAn', state: 'SP', coordinates: { lat: -23.3592, lng: -46.7794 }, basePrice: 11.80 },
  { id: 'sp-band-itupeva', name: 'Pedágio Itupeva (Bandeirantes)', highway: 'SP-348 Rod. dos Bandeirantes', concessionaire: 'CCR AutoBAn', state: 'SP', coordinates: { lat: -23.1601, lng: -47.0543 }, basePrice: 11.80 },
  { id: 'sp-band-sumare', name: 'Pedágio Sumaré (Bandeirantes)', highway: 'SP-348 Rod. dos Bandeirantes', concessionaire: 'CCR AutoBAn', state: 'SP', coordinates: { lat: -22.8211, lng: -47.2514 }, basePrice: 10.90 },
  { id: 'sp-band-limeira', name: 'Pedágio Limeira (Bandeirantes)', highway: 'SP-348 Rod. dos Bandeirantes', concessionaire: 'CCR AutoBAn', state: 'SP', coordinates: { lat: -22.6105, lng: -47.4112 }, basePrice: 8.20 },
  { id: 'sp-anh-perus', name: 'Pedágio Perus (Anhanguera)', highway: 'SP-330 Rod. Anhanguera', concessionaire: 'CCR AutoBAn', state: 'SP', coordinates: { lat: -23.4112, lng: -46.7712 }, basePrice: 11.80 },
  { id: 'sp-anh-valinhos', name: 'Pedágio Valinhos (Anhanguera)', highway: 'SP-330 Rod. Anhanguera', concessionaire: 'CCR AutoBAn', state: 'SP', coordinates: { lat: -22.9912, lng: -47.0812 }, basePrice: 11.80 },
  { id: 'sp-anh-nova-odessa', name: 'Pedágio Nova Odessa (Anhanguera)', highway: 'SP-330 Rod. Anhanguera', concessionaire: 'CCR AutoBAn', state: 'SP', coordinates: { lat: -22.7812, lng: -47.2912 }, basePrice: 10.50 },
  { id: 'sp-anh-limeira', name: 'Pedágio Limeira Sul (Anhanguera)', highway: 'SP-330 Rod. Anhanguera', concessionaire: 'CCR AutoBAn', state: 'SP', coordinates: { lat: -22.5812, lng: -47.4312 }, basePrice: 8.20 },

  // ==========================================
  // SÃO PAULO - SISTEMA ANCHIETA-IMIGRANTES (Ecovias)
  // ==========================================
  { id: 'sp-imigrantes-piratininga', name: 'Pedágio Piratininga (Imigrantes)', highway: 'SP-160 Rod. dos Imigrantes', concessionaire: 'Ecovias', state: 'SP', coordinates: { lat: -23.7712, lng: -46.6012 }, basePrice: 36.80 },
  { id: 'sp-imigrantes-diadema', name: 'Pedágio Diadema (Imigrantes)', highway: 'SP-160 Rod. dos Imigrantes', concessionaire: 'Ecovias', state: 'SP', coordinates: { lat: -23.6912, lng: -46.6112 }, basePrice: 2.60 },
  { id: 'sp-imigrantes-eldorado', name: 'Pedágio Eldorado (Imigrantes)', highway: 'SP-160 Rod. dos Imigrantes', concessionaire: 'Ecovias', state: 'SP', coordinates: { lat: -23.7312, lng: -46.6052 }, basePrice: 4.80 },
  { id: 'sp-imigrantes-batistini', name: 'Pedágio Batistini (Imigrantes)', highway: 'SP-160 Rod. dos Imigrantes', concessionaire: 'Ecovias', state: 'SP', coordinates: { lat: -23.7512, lng: -46.5912 }, basePrice: 7.60 },
  { id: 'sp-anchieta-riacho-grande', name: 'Pedágio Riacho Grande (Anchieta)', highway: 'SP-150 Rod. Anchieta', concessionaire: 'Ecovias', state: 'SP', coordinates: { lat: -23.7912, lng: -46.5412 }, basePrice: 36.80 },
  { id: 'sp-padre-manoel-sao-vicente', name: 'Pedágio Santos/São Vicente (SP-055)', highway: 'SP-055 Rod. Pe. Manoel da Nóbrega', concessionaire: 'Ecovias', state: 'SP', coordinates: { lat: -23.9512, lng: -46.4212 }, basePrice: 8.80 },

  // ==========================================
  // SÃO PAULO - SISTEMA CASTELO BRANCO-RAPOSO TAVARES (CCR ViaOeste)
  // ==========================================
  { id: 'sp-castelo-osasco', name: 'Pedágio Osasco (Castelo Branco)', highway: 'SP-280 Rod. Castelo Branco', concessionaire: 'CCR ViaOeste', state: 'SP', coordinates: { lat: -23.5182, lng: -46.7991 }, basePrice: 5.90 },
  { id: 'sp-castelo-barueri', name: 'Pedágio Barueri (Castelo Branco)', highway: 'SP-280 Rod. Castelo Branco', coordinates: { lat: -23.5012, lng: -46.8812 }, concessionaire: 'CCR ViaOeste', state: 'SP', basePrice: 5.90 },
  { id: 'sp-castelo-itapevi', name: 'Pedágio Itapevi (Castelo Branco)', highway: 'SP-280 Rod. Castelo Branco', concessionaire: 'CCR ViaOeste', state: 'SP', coordinates: { lat: -23.5211, lng: -46.9612 }, basePrice: 11.80 },
  { id: 'sp-castelo-itu', name: 'Pedágio Itu (Castelo Branco)', highway: 'SP-280 Rod. Castelo Branco', concessionaire: 'CCR ViaOeste', state: 'SP', coordinates: { lat: -23.4111, lng: -47.2412 }, basePrice: 14.80 },
  { id: 'sp-castelo-boituva', name: 'Pedágio Boituva (Castelo Branco)', highway: 'SP-280 Rod. Castelo Branco', concessionaire: 'CCR SPVias', state: 'SP', coordinates: { lat: -23.3211, lng: -47.6612 }, basePrice: 12.20 },
  { id: 'sp-castelo-quadra', name: 'Pedágio Quadra (Castelo Branco)', highway: 'SP-280 Rod. Castelo Branco', concessionaire: 'CCR SPVias', state: 'SP', coordinates: { lat: -23.2811, lng: -48.0812 }, basePrice: 16.40 },
  { id: 'sp-castelo-itatinga', name: 'Pedágio Itatinga (Castelo Branco)', highway: 'SP-280 Rod. Castelo Branco', concessionaire: 'CCR SPVias', state: 'SP', coordinates: { lat: -23.1611, lng: -48.5812 }, basePrice: 16.80 },
  { id: 'sp-castelo-iaras', name: 'Pedágio Iaras (Castelo Branco)', highway: 'SP-280 Rod. Castelo Branco', concessionaire: 'CCR SPVias', state: 'SP', coordinates: { lat: -22.9211, lng: -49.1212 }, basePrice: 12.00 },
  { id: 'sp-raposo-sao-roque', name: 'Pedágio São Roque (Raposo Tavares)', highway: 'SP-270 Rod. Raposo Tavares', concessionaire: 'CCR ViaOeste', state: 'SP', coordinates: { lat: -23.5512, lng: -47.1112 }, basePrice: 11.80 },
  { id: 'sp-raposo-aluminio', name: 'Pedágio Alumínio (Raposo Tavares)', highway: 'SP-270 Rod. Raposo Tavares', concessionaire: 'CCR ViaOeste', state: 'SP', coordinates: { lat: -23.5212, lng: -47.2812 }, basePrice: 11.80 },

  // ==========================================
  // SÃO PAULO - RODOANEL MÁRIO COVAS (SP-021)
  // ==========================================
  { id: 'sp-rodoanel-oeste-padroeira', name: 'Pedágio Rodoanel Oeste (Padroeira)', highway: 'SP-021 Rodoanel Oeste', concessionaire: 'CCR RodoAnel', state: 'SP', coordinates: { lat: -23.5412, lng: -46.8212 }, basePrice: 3.20 },
  { id: 'sp-rodoanel-oeste-anhanguera', name: 'Pedágio Rodoanel Oeste (Anhanguera)', highway: 'SP-021 Rodoanel Oeste', concessionaire: 'CCR RodoAnel', state: 'SP', coordinates: { lat: -23.4712, lng: -46.7812 }, basePrice: 3.20 },
  { id: 'sp-rodoanel-sul-guarapiranga', name: 'Pedágio Rodoanel Sul (Guarapiranga)', highway: 'SP-021 Rodoanel Sul', concessionaire: 'SPMAR', state: 'SP', coordinates: { lat: -23.7212, lng: -46.7212 }, basePrice: 4.30 },
  { id: 'sp-rodoanel-sul-imigrantes', name: 'Pedágio Rodoanel Sul (Imigrantes)', highway: 'SP-021 Rodoanel Sul', concessionaire: 'SPMAR', state: 'SP', coordinates: { lat: -23.7612, lng: -46.6212 }, basePrice: 4.30 },
  { id: 'sp-rodoanel-leste-suzano', name: 'Pedágio Rodoanel Leste (Suzano)', highway: 'SP-021 Rodoanel Leste', concessionaire: 'SPMAR', state: 'SP', coordinates: { lat: -23.5612, lng: -46.3612 }, basePrice: 3.50 },

  // ==========================================
  // SÃO PAULO - AYRTON SENNA & CARVALHO PINTO (Ecopistas)
  // ==========================================
  { id: 'sp-senna-itqua', name: 'Pedágio Itaquaquecetuba (Ayrton Senna)', highway: 'SP-070 Rod. Ayrton Senna', concessionaire: 'Ecopistas', state: 'SP', coordinates: { lat: -23.4712, lng: -46.3512 }, basePrice: 5.40 },
  { id: 'sp-senna-guararema', name: 'Pedágio Guararema (Carvalho Pinto)', highway: 'SP-070 Rod. Carvalho Pinto', concessionaire: 'Ecopistas', state: 'SP', coordinates: { lat: -23.3612, lng: -46.0312 }, basePrice: 4.80 },
  { id: 'sp-senna-sjc', name: 'Pedágio São José dos Campos (Carvalho Pinto)', highway: 'SP-070 Rod. Carvalho Pinto', concessionaire: 'Ecopistas', state: 'SP', coordinates: { lat: -23.2612, lng: -45.8812 }, basePrice: 4.80 },
  { id: 'sp-senna-cacapava', name: 'Pedágio Caçapava (Carvalho Pinto)', highway: 'SP-070 Rod. Carvalho Pinto', concessionaire: 'Ecopistas', state: 'SP', coordinates: { lat: -23.1312, lng: -45.7112 }, basePrice: 5.10 },

  // ==========================================
  // SÃO PAULO - ROTA DAS BANDEIRAS (SP-065 & SP-360)
  // ==========================================
  { id: 'sp-bandeiras-igarata', name: 'Pedágio Igaratá (Dom Pedro I)', highway: 'SP-065 Rod. D. Pedro I', concessionaire: 'Rota das Bandeiras', state: 'SP', coordinates: { lat: -23.2112, lng: -46.1212 }, basePrice: 12.20 },
  { id: 'sp-bandeiras-atibaia', name: 'Pedágio Atibaia (Dom Pedro I)', highway: 'SP-065 Rod. D. Pedro I', concessionaire: 'Rota das Bandeiras', state: 'SP', coordinates: { lat: -23.1412, lng: -46.5412 }, basePrice: 9.80 },
  { id: 'sp-bandeiras-itatiba', name: 'Pedágio Itatiba (Dom Pedro I)', highway: 'SP-065 Rod. D. Pedro I', concessionaire: 'Rota das Bandeiras', state: 'SP', coordinates: { lat: -22.9912, lng: -46.8412 }, basePrice: 12.60 },
  { id: 'sp-bandeiras-jundiai', name: 'Pedágio Jundiaí (Constâncio Cintra)', highway: 'SP-360 Rod. Eng. Constâncio Cintra', concessionaire: 'Rota das Bandeiras', state: 'SP', coordinates: { lat: -23.1512, lng: -46.8812 }, basePrice: 7.20 },

  // ==========================================
  // SÃO PAULO - RODOVIA DOS TAMOIOS (SP-099 Litoral Norte)
  // ==========================================
  { id: 'sp-tamoios-jambeiro', name: 'Pedágio Jambeiro (Tamoios)', highway: 'SP-099 Rod. dos Tamoios', concessionaire: 'Concessionária Tamoios', state: 'SP', coordinates: { lat: -23.3212, lng: -45.7612 }, basePrice: 5.50 },
  { id: 'sp-tamoios-paraibuna', name: 'Pedágio Paraibuna (Tamoios)', highway: 'SP-099 Rod. dos Tamoios', concessionaire: 'Concessionária Tamoios', state: 'SP', coordinates: { lat: -23.4112, lng: -45.6412 }, basePrice: 12.20 },

  // ==========================================
  // SÃO PAULO - INTERIOR (Washington Luís / SP-310 / Eixo SP / Triângulo do Sol)
  // ==========================================
  { id: 'sp-wash-cordeiropolis', name: 'Pedágio Cordeirópolis (Washington Luís)', highway: 'SP-310 Rod. Washington Luís', concessionaire: 'Ecorodovias Centrovias', state: 'SP', coordinates: { lat: -22.4812, lng: -47.4512 }, basePrice: 11.20 },
  { id: 'sp-wash-itirapina', name: 'Pedágio Itirapina (Washington Luís)', highway: 'SP-310 Rod. Washington Luís', concessionaire: 'Ecorodovias Centrovias', state: 'SP', coordinates: { lat: -22.2512, lng: -47.8112 }, basePrice: 7.40 },
  { id: 'sp-wash-sao-carlos', name: 'Pedágio São Carlos (Washington Luís)', highway: 'SP-310 Rod. Washington Luís', concessionaire: 'Ecorodovias Centrovias', state: 'SP', coordinates: { lat: -22.0212, lng: -47.9312 }, basePrice: 9.80 },
  { id: 'sp-wash-araraquara', name: 'Pedágio Araraquara (Washington Luís)', highway: 'SP-310 Rod. Washington Luís', concessionaire: 'Triângulo do Sol', state: 'SP', coordinates: { lat: -21.7112, lng: -48.2512 }, basePrice: 20.80 },
  { id: 'sp-wash-sao-carlos-norte', name: 'Pedágio Matão/Santa Ernestina (SP-310)', highway: 'SP-310 Rod. Washington Luís', concessionaire: 'Triângulo do Sol', state: 'SP', coordinates: { lat: -21.5112, lng: -48.4212 }, basePrice: 18.90 },
  { id: 'sp-wash-catanduva', name: 'Pedágio Catanduva (Washington Luís)', highway: 'SP-310 Rod. Washington Luís', concessionaire: 'Triângulo do Sol', state: 'SP', coordinates: { lat: -21.1812, lng: -48.9812 }, basePrice: 19.50 },
  { id: 'sp-wash-sjrp', name: 'Pedágio Cedral / S.J. Rio Preto (SP-310)', highway: 'SP-310 Rod. Washington Luís', concessionaire: 'Triângulo do Sol', state: 'SP', coordinates: { lat: -20.9112, lng: -49.3212 }, basePrice: 11.40 },

  // ==========================================
  // BR-116 - DUTRA (SP / RJ) - CCR RioSP
  // ==========================================
  { id: 'br116-dutra-aruja', name: 'Pedágio Arujá (Dutra)', highway: 'BR-116 Rod. Pres. Dutra', concessionaire: 'CCR RioSP', state: 'SP', coordinates: { lat: -23.4072, lng: -46.3314 }, basePrice: 4.10 },
  { id: 'br116-dutra-guararema', name: 'Pedágio Guararema (Dutra)', highway: 'BR-116 Rod. Pres. Dutra', concessionaire: 'CCR RioSP', state: 'SP', coordinates: { lat: -23.3618, lng: -46.0682 }, basePrice: 4.10 },
  { id: 'br116-dutra-jacarei', name: 'Pedágio Jacareí (Dutra)', highway: 'BR-116 Rod. Pres. Dutra', concessionaire: 'CCR RioSP', state: 'SP', coordinates: { lat: -23.2842, lng: -45.9681 }, basePrice: 7.60 },
  { id: 'br116-dutra-moreira-cesar', name: 'Pedágio Moreira César (Dutra)', highway: 'BR-116 Rod. Pres. Dutra', concessionaire: 'CCR RioSP', state: 'SP', coordinates: { lat: -22.9511, lng: -45.3612 }, basePrice: 16.50 },
  { id: 'br116-dutra-itatiaia', name: 'Pedágio Itatiaia (Dutra)', highway: 'BR-116 Rod. Pres. Dutra', concessionaire: 'CCR RioSP', state: 'RJ', coordinates: { lat: -22.5034, lng: -44.5714 }, basePrice: 16.50 },
  { id: 'br116-dutra-viuva-graca', name: 'Pedágio Viúva Graça (Dutra)', highway: 'BR-116 Rod. Pres. Dutra', concessionaire: 'CCR RioSP', state: 'RJ', coordinates: { lat: -22.7092, lng: -43.7198 }, basePrice: 16.50 },

  // ==========================================
  // RIO DE JANEIRO (Ponte Rio-Niterói, Linha Amarela, ViaLagos, BR-040)
  // ==========================================
  { id: 'rj-ponte-rio-niteroi', name: 'Pedágio Ponte Rio-Niterói', highway: 'BR-101 Ponte Rio-Niterói', concessionaire: 'Ecoponte', state: 'RJ', coordinates: { lat: -22.8712, lng: -43.1412 }, basePrice: 6.20 },
  { id: 'rj-linha-amarela', name: 'Pedágio Linha Amarela (Lamsa)', highway: 'Av. Carlos Lacerda / Linha Amarela', concessionaire: 'Lamsa', state: 'RJ', coordinates: { lat: -22.9112, lng: -43.3012 }, basePrice: 9.30 },
  { id: 'rj-vialagos-rio-bonito', name: 'Pedágio Rio Bonito (ViaLagos)', highway: 'RJ-124 Rod. dos Lagos', concessionaire: 'CCR ViaLagos', state: 'RJ', coordinates: { lat: -22.7212, lng: -42.4812 }, basePrice: 17.20 },
  { id: 'rj-concer-xerem', name: 'Pedágio Duque de Caxias / Xerém (BR-040)', highway: 'BR-040 Rod. Washington Luís', concessionaire: 'Concer', state: 'RJ', coordinates: { lat: -22.6112, lng: -43.2812 }, basePrice: 14.50 },
  { id: 'rj-concer-petropolis', name: 'Pedágio Petrópolis / Areal (BR-040)', highway: 'BR-040 Rio - Juiz de Fora', concessionaire: 'Concer', state: 'RJ', coordinates: { lat: -22.3112, lng: -43.1912 }, basePrice: 14.50 },

  // ==========================================
  // BR-101 RIO-SANTOS (Free Flow Pórticos CCR RioSP)
  // ==========================================
  { id: 'br101-ff-itaguai', name: 'Pórtico Free Flow Itaguaí (Km 414)', highway: 'BR-101 Rio-Santos', concessionaire: 'CCR RioSP', state: 'RJ', coordinates: { lat: -22.8812, lng: -43.7812 }, basePrice: 5.20, isFreeFlow: true },
  { id: 'br101-ff-mangaratiba', name: 'Pórtico Free Flow Mangaratiba (Km 447)', highway: 'BR-101 Rio-Santos', concessionaire: 'CCR RioSP', state: 'RJ', coordinates: { lat: -22.9612, lng: -44.0412 }, basePrice: 5.20, isFreeFlow: true },
  { id: 'br101-ff-paraty', name: 'Pórtico Free Flow Paraty (Km 538)', highway: 'BR-101 Rio-Santos', concessionaire: 'CCR RioSP', state: 'RJ', coordinates: { lat: -23.2212, lng: -44.7212 }, basePrice: 5.20, isFreeFlow: true },

  // ==========================================
  // BR-381 - RODOVIA FERNÃO DIAS (SP / MG) - Arteris
  // ==========================================
  { id: 'br381-fernao-mairipora', name: 'Pedágio Mairiporã (Fernão Dias)', highway: 'BR-381 Rod. Fernão Dias', concessionaire: 'Arteris Fernão Dias', state: 'SP', coordinates: { lat: -23.3214, lng: -46.5912 }, basePrice: 3.20 },
  { id: 'br381-fernao-vargem', name: 'Pedágio Vargem (Fernão Dias)', highway: 'BR-381 Rod. Fernão Dias', concessionaire: 'Arteris Fernão Dias', state: 'SP', coordinates: { lat: -22.8912, lng: -46.4212 }, basePrice: 3.20 },
  { id: 'br381-fernao-cambui', name: 'Pedágio Cambuí (Fernão Dias)', highway: 'BR-381 Rod. Fernão Dias', concessionaire: 'Arteris Fernão Dias', state: 'MG', coordinates: { lat: -22.6112, lng: -46.0412 }, basePrice: 3.20 },
  { id: 'br381-fernao-careacu', name: 'Pedágio Careaçu (Fernão Dias)', highway: 'BR-381 Rod. Fernão Dias', concessionaire: 'Arteris Fernão Dias', state: 'MG', coordinates: { lat: -22.0812, lng: -45.6512 }, basePrice: 3.20 },
  { id: 'br381-fernao-carmo', name: 'Pedágio Carmo da Cachoeira (Fernão Dias)', highway: 'BR-381 Rod. Fernão Dias', concessionaire: 'Arteris Fernão Dias', state: 'MG', coordinates: { lat: -21.7112, lng: -45.1912 }, basePrice: 3.20 },
  { id: 'br381-fernao-santo-antonio', name: 'Pedágio Sto. Antônio do Amparo (BR-381)', highway: 'BR-381 Rod. Fernão Dias', concessionaire: 'Arteris Fernão Dias', state: 'MG', coordinates: { lat: -20.9512, lng: -44.9212 }, basePrice: 3.20 },
  { id: 'br381-fernao-carmopolis', name: 'Pedágio Carmópolis de Minas (BR-381)', highway: 'BR-381 Rod. Fernão Dias', concessionaire: 'Arteris Fernão Dias', state: 'MG', coordinates: { lat: -20.5212, lng: -44.6212 }, basePrice: 3.20 },
  { id: 'br381-fernao-betim', name: 'Pedágio Betim / Igarapé (Fernão Dias)', highway: 'BR-381 Rod. Fernão Dias', concessionaire: 'Arteris Fernão Dias', state: 'MG', coordinates: { lat: -20.0212, lng: -44.2012 }, basePrice: 3.20 },

  // ==========================================
  // BR-116 - RÉGIS BITTENCOURT (SP / PR) - Arteris
  // ==========================================
  { id: 'br116-regis-sao-lourenco', name: 'Pedágio São Lourenço da Serra', highway: 'BR-116 Régis Bittencourt', concessionaire: 'Arteris Régis Bittencourt', state: 'SP', coordinates: { lat: -23.8512, lng: -46.9412 }, basePrice: 4.00 },
  { id: 'br116-regis-miracatu', name: 'Pedágio Miracatu', highway: 'BR-116 Régis Bittencourt', concessionaire: 'Arteris Régis Bittencourt', state: 'SP', coordinates: { lat: -24.2812, lng: -47.4612 }, basePrice: 4.00 },
  { id: 'br116-regis-juquia', name: 'Pedágio Juquiá', highway: 'BR-116 Régis Bittencourt', concessionaire: 'Arteris Régis Bittencourt', state: 'SP', coordinates: { lat: -24.4212, lng: -47.6612 }, basePrice: 4.00 },
  { id: 'br116-regis-cajati', name: 'Pedágio Cajati', highway: 'BR-116 Régis Bittencourt', concessionaire: 'Arteris Régis Bittencourt', state: 'SP', coordinates: { lat: -24.7312, lng: -48.1212 }, basePrice: 4.00 },
  { id: 'br116-regis-barra-turvo', name: 'Pedágio Barra do Turvo', highway: 'BR-116 Régis Bittencourt', concessionaire: 'Arteris Régis Bittencourt', state: 'SP', coordinates: { lat: -24.9812, lng: -48.5112 }, basePrice: 4.00 },
  { id: 'br116-regis-campina-sul', name: 'Pedágio Campina Grande do Sul', highway: 'BR-116 Régis Bittencourt', concessionaire: 'Arteris Régis Bittencourt', state: 'PR', coordinates: { lat: -25.2812, lng: -49.0712 }, basePrice: 4.00 },

  // ==========================================
  // PARANÁ & SANTA CATARINA (BR-101 / BR-376 / BR-277) - Arteris / EPR
  // ==========================================
  { id: 'pr-br376-sao-jose-pinhais', name: 'Pedágio São José dos Pinhais (BR-376)', highway: 'BR-376 Curitiba - Joinville', concessionaire: 'Arteris Litoral Sul', state: 'PR', coordinates: { lat: -25.6112, lng: -49.1212 }, basePrice: 5.10 },
  { id: 'sc-br101-garuva', name: 'Pedágio Garuva (BR-101)', highway: 'BR-101 Litoral Sul', concessionaire: 'Arteris Litoral Sul', state: 'SC', coordinates: { lat: -26.0312, lng: -48.8612 }, basePrice: 5.10 },
  { id: 'sc-br101-araquari', name: 'Pedágio Araquari (BR-101)', highway: 'BR-101 Litoral Sul', concessionaire: 'Arteris Litoral Sul', state: 'SC', coordinates: { lat: -26.3712, lng: -48.7212 }, basePrice: 5.10 },
  { id: 'sc-br101-porto-belo', name: 'Pedágio Porto Belo (BR-101)', highway: 'BR-101 Litoral Sul', concessionaire: 'Arteris Litoral Sul', state: 'SC', coordinates: { lat: -27.1612, lng: -48.5912 }, basePrice: 5.10 },
  { id: 'sc-br101-palhoca', name: 'Pedágio Palhoça (BR-101)', highway: 'BR-101 Litoral Sul', concessionaire: 'Arteris Litoral Sul', state: 'SC', coordinates: { lat: -27.6512, lng: -48.6712 }, basePrice: 5.10 },
  { id: 'pr-br277-sao-jose', name: 'Pedágio São José dos Pinhais (BR-277)', highway: 'BR-277 Curitiba - Paranaguá', concessionaire: 'EPR Litoral Pioneiro', state: 'PR', coordinates: { lat: -25.5612, lng: -48.9812 }, basePrice: 12.80 },
  { id: 'pr-br277-witmarsum', name: 'Pedágio Palmeira / Witmarsum (BR-277)', highway: 'BR-277 Curitiba - Ponta Grossa', concessionaire: 'Via Araucária', state: 'PR', coordinates: { lat: -25.4312, lng: -49.8812 }, basePrice: 10.90 },
  { id: 'pr-br277-irati', name: 'Pedágio Irati (BR-277)', highway: 'BR-277 Interior PR', concessionaire: 'Via Araucária', state: 'PR', coordinates: { lat: -25.4812, lng: -50.6212 }, basePrice: 11.20 },

  // ==========================================
  // RIO GRANDE DO SUL (BR-290 Free-way & BR-386) - CCR ViaSul
  // ==========================================
  { id: 'rs-br290-gravatai', name: 'Pedágio Gravataí (Free-way BR-290)', highway: 'BR-290 Free-way', concessionaire: 'CCR ViaSul', state: 'RS', coordinates: { lat: -29.9412, lng: -50.9912 }, basePrice: 5.80 },
  { id: 'rs-br290-santo-antonio', name: 'Pedágio Santo Antônio da Patrulha (BR-290)', highway: 'BR-290 Free-way', concessionaire: 'CCR ViaSul', state: 'RS', coordinates: { lat: -29.8612, lng: -50.5112 }, basePrice: 5.80 },
  { id: 'rs-br386-montenegro', name: 'Pedágio Montenegro (BR-386)', highway: 'BR-386 Rod. da Produção', concessionaire: 'CCR ViaSul', state: 'RS', coordinates: { lat: -29.6912, lng: -51.4612 }, basePrice: 5.80 },
  { id: 'rs-br386-paverama', name: 'Pedágio Paverama (BR-386)', highway: 'BR-386 Rod. da Produção', concessionaire: 'CCR ViaSul', state: 'RS', coordinates: { lat: -29.5512, lng: -51.7212 }, basePrice: 5.80 },

  // ==========================================
  // GOIÁS & BRASÍLIA & MINAS (BR-050 / BR-060 / BR-153 / BR-040)
  // ==========================================
  { id: 'go-br060-alexania', name: 'Pedágio Alexânia (BR-060 BSB/GYN)', highway: 'BR-060 Brasília - Goiânia', concessionaire: 'Triunfo Concebra', state: 'GO', coordinates: { lat: -16.0812, lng: -48.5112 }, basePrice: 7.10 },
  { id: 'go-br060-goianapolis', name: 'Pedágio Goianápolis (BR-060)', highway: 'BR-060 Brasília - Goiânia', concessionaire: 'Triunfo Concebra', state: 'GO', coordinates: { lat: -16.4812, lng: -49.0212 }, basePrice: 5.20 },
  { id: 'go-br153-professor-jamil', name: 'Pedágio Professor Jamil (BR-153)', highway: 'BR-153 Goiânia - Itumbiara', concessionaire: 'Triunfo Concebra', state: 'GO', coordinates: { lat: -17.2512, lng: -49.2412 }, basePrice: 6.80 },
  { id: 'go-br153-itumbiara', name: 'Pedágio Itumbiara (BR-153)', highway: 'BR-153 Goiânia - Itumbiara', concessionaire: 'Triunfo Concebra', state: 'GO', coordinates: { lat: -18.4212, lng: -49.2112 }, basePrice: 8.90 },
  { id: 'mg-br050-araguari', name: 'Pedágio Araguari (BR-050)', highway: 'BR-050 Triângulo Mineiro', concessionaire: 'Eco050', state: 'MG', coordinates: { lat: -18.6512, lng: -48.1912 }, basePrice: 6.40 },
  { id: 'mg-br050-uberaba', name: 'Pedágio Uberaba (BR-050)', highway: 'BR-050 Triângulo Mineiro', concessionaire: 'Eco050', state: 'MG', coordinates: { lat: -19.7512, lng: -47.9312 }, basePrice: 7.80 },
  { id: 'mg-br040-sete-lagoas', name: 'Pedágio Sete Lagoas (BR-040)', highway: 'BR-040 BH - Brasília', concessionaire: 'Via 040 / EPR', state: 'MG', coordinates: { lat: -19.4512, lng: -44.2412 }, basePrice: 6.30 },
  { id: 'mg-br040-itaiacoca', name: 'Pedágio Itabirito / Alphaville (BR-040)', highway: 'BR-040 BH - Rio', concessionaire: 'EPR Via Mineira', state: 'MG', coordinates: { lat: -20.2512, lng: -43.9512 }, basePrice: 12.70 },
  { id: 'mg-br040-conselheiro-lafaiete', name: 'Pedágio Conselheiro Lafaiete (BR-040)', highway: 'BR-040 BH - Rio', concessionaire: 'EPR Via Mineira', state: 'MG', coordinates: { lat: -20.6612, lng: -43.7812 }, basePrice: 12.70 },
  { id: 'mg-br040-barbacena', name: 'Pedágio Barbacena (BR-040)', highway: 'BR-040 BH - Rio', concessionaire: 'EPR Via Mineira', state: 'MG', coordinates: { lat: -21.2212, lng: -43.7612 }, basePrice: 12.70 },
  { id: 'mg-br040-juiz-de-fora', name: 'Pedágio Simão Pereira / Juiz de Fora (BR-040)', highway: 'BR-040 BH - Rio', concessionaire: 'EPR Via Mineira', state: 'MG', coordinates: { lat: -21.9512, lng: -43.3212 }, basePrice: 12.70 },

  // ==========================================
  // BAHIA & ESPÍRITO SANTO (BR-324 / BA-099 / BR-101 Eco101)
  // ==========================================
  { id: 'ba-099-linha-verde', name: 'Pedágio Linha Verde (BA-099)', highway: 'BA-099 Estrada do Coco', concessionaire: 'CLN', state: 'BA', coordinates: { lat: -12.8212, lng: -38.2512 }, basePrice: 9.60 },
  { id: 'ba-br324-amalia-rodrigues', name: 'Pedágio Amélia Rodrigues (BR-324 Salvador/Feira)', highway: 'BR-324', concessionaire: 'ViaBahia', state: 'BA', coordinates: { lat: -12.4112, lng: -38.7512 }, basePrice: 3.50 },
  { id: 'ba-br324-simoes-filho', name: 'Pedágio Simões Filho (BR-324)', highway: 'BR-324 Salvador/Feira', concessionaire: 'ViaBahia', state: 'BA', coordinates: { lat: -12.7812, lng: -38.4012 }, basePrice: 3.50 },
  { id: 'es-br101-guarapari', name: 'Pedágio Guarapari (BR-101)', highway: 'BR-101 ES', concessionaire: 'Eco101', state: 'ES', coordinates: { lat: -20.6512, lng: -40.4912 }, basePrice: 5.40 },
  { id: 'es-br101-serra', name: 'Pedágio Serra (BR-101)', highway: 'BR-101 ES', concessionaire: 'Eco101', state: 'ES', coordinates: { lat: -20.1212, lng: -40.3012 }, basePrice: 5.20 },
];
