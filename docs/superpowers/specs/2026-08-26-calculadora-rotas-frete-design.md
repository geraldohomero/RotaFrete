# Especificação de Design: Calculadora de Custos de Viagem e Rotas (RotaFrete)

**Data:** 2026-08-26  
**Status:** Aprovado para Planejamento  
**Stack:** React 18, TypeScript, Vite, Tailwind CSS, Lucide React, Leaflet / React-Leaflet, OSRM / Nominatim APIs  

---

## 1. Visão Geral do Produto

A **RotaFrete** é uma aplicação web simples, moderna e sem necessidade de cadastro de usuários para calcular com precisão todos os custos associados a viagens rodoviárias para diferentes categorias de veículos (carros de passeio, motos, vans, ônibus e caminhões de 2 a 9 eixos).

A ferramenta combina:
1. Cálculo de rotas inteligentes (Mais Rápida, Mais Curta e Sem Pedágios).
2. Cálculo de combustível por consumo médio e preço.
3. Identificação e cálculo híbrido de pedágios (detecção automática por rodovia/tarifa por categoria + ajuste manual).
4. Gastos extras detalhados (alimentação, hospedagem, diária de motorista, manutenção preventiva por km e outros).
5. Geração de relatórios ultra-detalhados prontos para copiar e colar (WhatsApp, E-mail ou Texto/Orçamento).
6. Suporte completo a **Modo Claro (Light)** e **Modo Escuro (Dark)**.

---

## 2. Arquitetura e Tecnologias

- **Frontend Core:** React 18 com TypeScript e Vite para carregamento ultrarrápido.
- **Estilização & UI:** Tailwind CSS com suporte a tema `dark:` nativo, paleta moderna e componentes acessíveis e responsivos.
- **Ícones:** Lucide React.
- **Mapas e Roteamento:**
  - **Map Rendering:** Leaflet + OpenStreetMap tiles (com visual claro e escuro compatível).
  - **Geocodificação (Busca de Endereços):** OpenStreetMap Nominatim / Photon API com debounce e autocompletar.
  - **Motor de Rotas:** OSRM (Open Source Routing Machine) público, com suporte a cálculo de:
    - Rota Mais Rápida (`overview=full`, `geometries=geojson`)
    - Rota Mais Curta (`steps=true`)
    - Rota Sem Pedágio / Alternativa
  - **Google Maps API (Opcional):** Suporte opcional nas configurações caso o usuário deseje inserir sua chave do Google Maps.
- **Persistência Local:** `localStorage` para salvar preferências (tema dark/light, veículo padrão, preço de combustível favorito e histórico recente de pesquisas).
- **Sem Backend:** 100% executável no cliente (Single Page App), seguro e sem custos de infraestrutura de servidor.

---

## 3. Estrutura de Dados e Funcionalidades

### 3.1 Categorias de Veículos e Multiplicadores de Pedágio
| Categoria | Nome | Multiplicador de Pedágio Padrão | Combustível Padrão | Consumo Médio Sugerido |
|---|---|---|---|---|
| `moto` | Motocicleta / Triciclo | 0.5x | Gasolina | 30.0 km/l |
| `carro` | Automóvel / SUV | 1.0x | Gasolina | 12.0 km/l |
| `van` | Van / Utilitário leve | 1.0x - 1.5x | Diesel / Flex | 9.0 km/l |
| `onibus_2` | Ônibus (2 eixos) | 2.0x | Diesel | 4.0 km/l |
| `onibus_3` | Ônibus (3 eixos) | 3.0x | Diesel | 3.2 km/l |
| `caminhao_2` | Caminhão Toco / VUC (2 eixos) | 2.0x | Diesel S10 | 4.5 km/l |
| `caminhao_3` | Caminhão Truck (3 eixos) | 3.0x | Diesel S10 | 3.5 km/l |
| `caminhao_4` | Caminhão Bitruck (4 eixos) | 4.0x | Diesel S10 | 2.8 km/l |
| `caminhao_5` | Carreta Simples (5 eixos) | 5.0x | Diesel S10 | 2.4 km/l |
| `caminhao_6` | Carreta LS / Bitrem (6 eixos) | 6.0x | Diesel S10 | 2.1 km/l |
| `caminhao_7_9` | Rodotrem (7 a 9 eixos) | 7.0x a 9.0x | Diesel S10 | 1.8 km/l |

*O usuário pode customizar o valor de consumo (km/l), tipo de combustível e preço por litro livremente.*

### 3.2 Motor Híbrido de Pedágios
1. **Detecção Automática:** Ao traçar a rota, o sistema identifica trechos tarifados e praças de pedágio ao longo da geometria da rota (usando nós e rodovias tarifadas do OSM / cálculo médio por km em rodovias concessionadas ou APIs de pedágio).
2. **Cálculo por Eixos/Categoria:** Multiplica a tarifa base da praça pelo fator do veículo selecionado.
3. **Lista e Edição Interativa:** O usuário visualiza a lista com o número de praças de pedágio detectadas, valor individual de cada uma, com capacidade de:
   - Alterar o valor de qualquer pedágio.
   - Adicionar uma nova praça de pedágio manualmente.
   - Remover ou desativar praças.

### 3.3 Gastos Adicionais
- **Alimentação:** Valor total (R$).
- **Hospedagem:** Valor total (R$).
- **Diária de Motorista / Mão de Obra:** Valor total (R$).
- **Manutenção & Desgaste:** Taxa por km rodado (R$/km) ou valor fixo.
- **Seguro / Outros Gastos:** Itens customizados adicionáveis pelo usuário.

### 3.4 Opções de Viagem
- **Ida e Volta:** Toggle que dobra a distância, combustível e pedágios, recalculando o custo total ou permitindo visualizar o custo unitário e de retorno.
- **Tipo de Rota:**
  - 🚀 Rota Eficiente / Mais Rápida
  - 📏 Rota Mais Curta
  - 🚫 Rota Sem Pedágio

---

## 4. Relatório Detalhado de Viagem (Copiar e Colar)

A aplicação conta com um modal/painel de exportação com múltiplos formatos:

### 4.1 Formato WhatsApp / Mensagens Rápidas
```text
🚛 *RELATÓRIO DETALHADO DE VIAGEM - ROTAFRETE*
━━━━━━━━━━━━━━━━━━━━━━━━━━
📍 *Origem:* São Paulo, SP
🏁 *Destino:* Curitiba, PR
🔄 *Tipo:* Ida e Volta (Duplo percurso)
🛣️ *Modalidade de Rota:* Mais Rápida
⏱️ *Tempo Estimado:* 10h 30min
📏 *Distância Total:* 816 km

🚙 *DADOS DO VEÍCULO*
• Tipo: Caminhão Truck (3 eixos)
• Consumo: 3.5 km/l
• Combustível: Diesel S10 (R$ 6,15/l)
• Litros Necessários: 233.1 L

💰 *DETALHAMENTO DOS CUSTOS*
⛽ *Combustível:* R$ 1.433,57
🛣️ *Pedágios (10 praças):* R$ 246,00
🍽️ *Alimentação:* R$ 120,00
🏨 *Hospedagem:* R$ 0,00
👨‍✈️ *Diária / Outros:* R$ 300,00
🔧 *Desgaste/Manutenção:* R$ 163,20
━━━━━━━━━━━━━━━━━━━━━━━━━━
💵 *CUSTO TOTAL DA VIAGEM:* R$ 2.262,77
📊 *Custo por Quilômetro:* R$ 2,77 / km
━━━━━━━━━━━━━━━━━━━━━━━━━━
_Gerado via RotaFrete_
```

### 4.2 Formato Texto / E-mail Corporativo
Texto com estrutura formal, listando todas as variáveis, cálculos matemáticos e discriminação de despesas para orçamentos de frete e prestação de contas.

---

## 5. Interface de Usuário (UI/UX)

- **Header:** Logo estilizado da RotaFrete, subtítulo e botão switch de Dark Mode (☀️ / 🌙).
- **Barra Lateral Esquerda (Configuração):**
  - Card 1: Origem e Destino com autocompletar e botão de inverter rota.
  - Card 2: Seletor de Tipo de Rota (Eficiente, Curta, Sem Pedágio) + Switch Ida e Volta.
  - Card 3: Dados do Veículo (Categoria, Eixos, Consumo km/l, Combustível e Preço R$/L).
  - Card 4: Gastos Extras (Alimentação, Hospedagem, Diárias, Manutenção R$/km).
  - Card 5: Praças de Pedágio (Contador, valor total, lista expansível com botões de editar e adicionar).
- **Área Central Superior (Resumo Rápido):**
  - 4 Métricas em destaque: Custo Total (R$), Distância (km), Tempo Estimado, Custo por km (R$/km).
  - Barra de Progresso/Divisão de Custos com cores distintas (Combustível em azul/verde, Pedágios em laranja, Extras em roxo).
- **Área Central Principal:**
  - Mapa Leaflet interativo responsivo com tema claro e escuro, marcadores numerados de origem e destino, traçado da rota com polyline destacada e marcadores clicáveis nas praças de pedágio.
- **Ações Rápidas:**
  - Botão de "Copiar Relatório WhatsApp" (1 clique com toast de feedback "Copiado com sucesso!").
  - Botão de "Exportar Relatório Detalhado" (Modal com preview do texto e opções de formato).
  - Botão de "Limpar / Nova Rota".

---

## 6. Plano de Verificação e Testes

- **Testes Unitários de Cálculo:**
  - Cálculo de consumo: `(distância / consumo) * preço`.
  - Multiplicador de pedágio por categoria de veículo e eixos.
  - Soma de despesas extras e cálculo de custo por quilômetro.
  - Comutação de Ida e Volta dobrando valores proporcionais.
- **Testes de Roteamento & APIs:**
  - Busca de cidades brasileiras no autocompletar (Nominatim/Photon).
  - Cálculo de rota no OSRM com retorno de geometria GeoJSON válida.
  - Detecção e cálculo de pedágios na rota.
- **Testes de UI & Responsividade:**
  - Alternância de tema Dark/Light com contraste adequado.
  - Funcionamento em telas mobile (360px+) e desktop widescreen.
  - Teste de cópia para clipboard no navegador com feedback visual.
