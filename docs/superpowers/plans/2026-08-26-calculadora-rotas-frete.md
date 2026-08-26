# Calculadora de Custos de Viagem e Rotas (RotaFrete) - Plano de Implementação

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Construir uma aplicação web completa (SPA em React + TypeScript + Vite + Tailwind CSS + Leaflet) para cálculo preciso de custos de viagem (combustível, pedágios híbridos por veículo/eixos, despesas extras, ida/volta, modos de rota) com suporte a Dark Mode e geração de relatório ultra-detalhado para copiar e colar.

**Architecture:** Frontend React SPA moderno sem necessidade de backend. Utiliza Leaflet + OpenStreetMap para visualização no mapa, Nominatim/Photon para autocompletar de endereços, OSRM para roteamento (mais rápida, curta e sem pedágios), motor de regras de pedágios por categoria de veículo e gerador de relatórios para clipboard em múltiplos formatos.

**Tech Stack:** React 18, TypeScript, Vite, Tailwind CSS (com suporte a Dark Mode), Lucide React, Leaflet, React-Leaflet, Vitest para testes unitários.

## Global Constraints
- Totalmente executável no navegador (Client-side SPA).
- Sem necessidade de login ou banco de dados remoto; preferências salvas no `localStorage`.
- Tema Claro e Escuro com alternador rápido e sincronização visual com o mapa.
- Relatório de saída ultra-detalhado (número de pedágios, km, tipo de veículo, consumo km/l, preço combustível, detalhamento de custos, etc.) com cópia rápida para WhatsApp/Email.

---

### Task 1: Scaffolding do Projeto & Configuração de Ambiente

**Files:**
- Create: `package.json`, `vite.config.ts`, `tsconfig.json`, `tsconfig.node.json`, `tailwind.config.js`, `postcss.config.js`, `index.html`, `src/main.tsx`, `src/index.css`, `src/App.tsx`, `vitest.config.ts`

**Interfaces:**
- Produces: Ambiente de desenvolvimento funcional com Vite, React, TypeScript, Tailwind CSS, Leaflet e Vitest.

- [ ] **Step 1: Criar package.json e instalar dependências essenciais**
- [ ] **Step 2: Configurar Vite, TypeScript, Tailwind CSS com dark mode `class` e Vitest**
- [ ] **Step 3: Configurar index.html e estilos base com Tailwind e Leaflet CSS**
- [ ] **Step 4: Executar `npm test` inicial para verificar ambiente de testes**
- [ ] **Step 5: Commit do scaffolding inicial**

---

### Task 2: Domínio & Motor de Cálculos Financeiros e Veículos (TDD)

**Files:**
- Create: `src/types/trip.ts`
- Create: `src/constants/vehicles.ts`
- Create: `src/utils/calculator.ts`
- Test: `src/utils/calculator.test.ts`

**Interfaces:**
- Produces: Tipos (`VehicleType`, `VehicleConfig`, `TollBooth`, `ExtraExpenses`, `RouteMode`, `TripCalculationResult`), constantes de veículos e funções `calculateTripCosts()`, `formatCurrency()`, `formatDistance()`, `formatDuration()`.

- [ ] **Step 1: Definir os tipos TypeScript em `src/types/trip.ts`**
- [ ] **Step 2: Definir constantes e presets de veículos em `src/constants/vehicles.ts` (Carro, Moto, Van, Ônibus 2/3 eixos, Caminhões 2 a 9 eixos)**
- [ ] **Step 3: Escrever testes unitários em `src/utils/calculator.test.ts` para cálculo de combustível, multiplicador de pedágio, ida e volta e despesas extras**
- [ ] **Step 4: Implementar o motor de cálculo em `src/utils/calculator.ts` para fazer os testes passarem**
- [ ] **Step 5: Executar `npm test` e verificar aprovação**
- [ ] **Step 6: Commit do módulo de cálculos**

---

### Task 3: Serviços de Geocodificação, Roteamento e Pedágios

**Files:**
- Create: `src/services/geocoding.ts`
- Create: `src/services/routing.ts`
- Create: `src/services/tollDetection.ts`
- Test: `src/services/tollDetection.test.ts`
- Test: `src/services/routing.test.ts`

**Interfaces:**
- Produces: `searchAddresses(query)`, `calculateRoute(origin, destination, mode)`, `detectTollsOnRoute(coordinates, vehicleMultiplier)`.

- [ ] **Step 1: Escrever testes para detecção e cálculo de pedágios em `src/services/tollDetection.test.ts`**
- [ ] **Step 2: Implementar serviço de autocompletar e busca em `src/services/geocoding.ts` (Nominatim com priorização de cidades brasileiras e debounce)**
- [ ] **Step 3: Implementar serviço de roteamento em `src/services/routing.ts` (OSRM com modos Mais Rápida, Mais Curta e Sem Pedágio)**
- [ ] **Step 4: Implementar serviço de identificação e estimativa de praças de pedágio em `src/services/tollDetection.ts`**
- [ ] **Step 5: Executar testes de roteamento e pedágios**
- [ ] **Step 6: Commit dos serviços de mapas e pedágios**

---

### Task 4: Gerador de Relatórios Detalhados para Copiar e Colar

**Files:**
- Create: `src/utils/reportGenerator.ts`
- Create: `src/utils/clipboard.ts`
- Test: `src/utils/reportGenerator.test.ts`

**Interfaces:**
- Produces: `generateWhatsAppReport(data)`, `generateDetailedTextReport(data)`, `generateInvoiceReport(data)`, `copyToClipboard(text)`.

- [ ] **Step 1: Escrever testes unitários em `src/utils/reportGenerator.test.ts` verificando a presença de todos os dados solicitados pelo usuário (número de pedágios, km, tipo de veículo, consumo km/l, preço combustível, lista de pedágios e custos)**
- [ ] **Step 2: Implementar geradores de relatórios em `src/utils/reportGenerator.ts` com formatação WhatsApp (emojis/negritos) e relatório formal**
- [ ] **Step 3: Implementar utilitário seguro de cópia para área de transferência em `src/utils/clipboard.ts`**
- [ ] **Step 4: Executar testes do gerador de relatórios**
- [ ] **Step 5: Commit do módulo de relatórios**

---

### Task 5: Gerenciamento de Estado, Tema Dark/Light & Storage Local

**Files:**
- Create: `src/hooks/useDarkMode.ts`
- Create: `src/hooks/useTripCalculator.ts`
- Test: `src/hooks/useDarkMode.test.ts`

**Interfaces:**
- Produces: Hook `useDarkMode()` com alternador `toggleDarkMode`, persistência e sincronização de classes no HTML.
- Produces: Hook `useTripCalculator()` gerenciando todo o fluxo de formulário, rotas selecionadas, pedágios editáveis, histórico e cálculo automático.

- [ ] **Step 1: Escrever testes para alternância e persistência do tema Dark/Light**
- [ ] **Step 2: Implementar hook `useDarkMode.ts`**
- [ ] **Step 3: Implementar hook principal `useTripCalculator.ts` conectando os serviços de rotas, pedágios e cálculo financeiro**
- [ ] **Step 4: Executar testes e verificar funcionamento**
- [ ] **Step 5: Commit do gerenciamento de estado**

---

### Task 6: Componente de Mapa Interativo (Leaflet)

**Files:**
- Create: `src/components/Map/TripMap.tsx`
- Create: `src/components/Map/CustomMarkers.tsx`
- Create: `src/components/Map/MapController.tsx`

**Interfaces:**
- Produces: Componente `<TripMap />` renderizando tiles (com suporte a dark mode), marcadores de origem, destino, pins clicáveis de pedágios com popup de valor e polyline da rota com auto-ajuste de zoom (`fitBounds`).

- [ ] **Step 1: Criar marcadores SVG customizados para Origem, Destino e Praças de Pedágio em `CustomMarkers.tsx`**
- [ ] **Step 2: Implementar `TripMap.tsx` com React-Leaflet, suporte a tiles claros/escuros e popups informativos**
- [ ] **Step 3: Implementar `MapController.tsx` para animação suave de centralização e enquadramento da rota**
- [ ] **Step 4: Testar renderização do mapa**
- [ ] **Step 5: Commit do componente de mapa**

---

### Task 7: Componentes de Formulário, Pedágios e Resultados da UI

**Files:**
- Create: `src/components/Header.tsx`
- Create: `src/components/Form/AddressInput.tsx`
- Create: `src/components/Form/VehicleSelector.tsx`
- Create: `src/components/Form/RouteOptions.tsx`
- Create: `src/components/Form/ExtraExpensesSection.tsx`
- Create: `src/components/Tolls/TollListModal.tsx`
- Create: `src/components/Results/SummaryCards.tsx`
- Create: `src/components/Results/CostBreakdownBar.tsx`

**Interfaces:**
- Produces: Componentes modulares, acessíveis e responsivos com suporte nativo a dark mode (`dark:bg-slate-800`, etc.).

- [ ] **Step 1: Criar `Header.tsx` com logo, título e switch de Dark/Light mode**
- [ ] **Step 2: Criar `AddressInput.tsx` com autocompletar, debounce e botão de inverter origem/destino**
- [ ] **Step 3: Criar `VehicleSelector.tsx` com cartões de veículos, seleção de eixos e inputs de consumo (km/l) e combustível (R$/L)**
- [ ] **Step 4: Criar `RouteOptions.tsx` (Mais Rápida, Mais Curta, Sem Pedágios) + switch Ida e Volta**
- [ ] **Step 5: Criar `TollListModal.tsx` com lista das praças de pedágio detectadas, inputs para alterar valor, adicionar nova praça e excluir**
- [ ] **Step 6: Criar `ExtraExpensesSection.tsx` com campos de alimentação, hospedagem, diária de motorista e manutenção por km**
- [ ] **Step 7: Criar `SummaryCards.tsx` e `CostBreakdownBar.tsx` exibindo Custo Total, Distância, Tempo, Custo/km e divisão visual de gastos**
- [ ] **Step 8: Commit dos componentes de UI**

---

### Task 8: Modal de Relatório, Integração no `App.tsx` e Verificação Final

**Files:**
- Create: `src/components/Report/ReportModal.tsx`
- Create: `src/components/Toast.tsx`
- Modify: `src/App.tsx`

**Interfaces:**
- Produces: Aplicação completa integrada, responsiva e testada, pronta para uso em produção.

- [ ] **Step 1: Criar `ReportModal.tsx` com prévia do relatório em abas (WhatsApp, E-mail, Texto) e botão de copiar com 1 clique**
- [ ] **Step 2: Criar `Toast.tsx` para avisos visuais rápidos de confirmação de cópia**
- [ ] **Step 3: Integrar todos os componentes no `App.tsx` com layout responsivo em grid (Sidebar + Mapa + Painel de Resultados)**
- [ ] **Step 4: Executar suite completa de testes com `npm test`**
- [ ] **Step 5: Executar build de produção com `npm run build`**
- [ ] **Step 6: Commit final e verificação visual**
