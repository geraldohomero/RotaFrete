# RotaFrete

Calculadora de custos de viagem, pedagios, combustivel e despesas operacionais para automoveis, motocicletas, caminhoes e onibus.

<img width="1337" height="927" alt="image" src="https://github.com/user-attachments/assets/62bda9cb-6c5a-4303-a0b2-fbf9f842cb96" />

---

## 1. Visao Geral

O RotaFrete e uma aplicacao web desenvolvida em React, TypeScript e Tailwind CSS voltada para motoristas, transportadores e viajantes que precisam estimar com precisao os custos totais de um trajeto rodoviario.

A aplicacao opera de forma totalmente client-side, sem necessidade de autenticacao ou armazenamento em banco de dados central, permitindo a exportacao rapida de relatorios formatados para compartilhamento via WhatsApp, e-mail e sistemas internos.

---

## 2. Principais Funcionalidades

- **Calculo Dinamico de Rota:** Integracao com OpenStreetMap e OSRM para determinacao de distancia total, tempo de viagem e tracado no mapa interativo.
- **Deteccao de Pedagios:** Base de dados nacional georreferenciada contendo pracas de pedagio e porticos Free Flow nas principais concessoes federais (ANTT) e estaduais (ex: ARTESP), com cruzamento sequencial pelo eixo da rodovia.
- **Gestao Flexivel de Tarifas:** Interface para ativacao, desativacao, remocao, adicao manual e edicao direta de precos de pedagios.
- **Busca Nacional de Pracas:** Ferramenta de busca integrada para localizar e incluir pracas cadastradas em qualquer estado brasileiro.
- **Auto-Estimativa por Quilometragem:** Assistente para projecao de pedagios em trechos longos nao catalogados.
- **Tres Modos de Roteamento:**
  - *Mais Rapida:* Prioriza rodovias principais duplicadas.
  - *Mais Curta:* Prioriza a menor extensao em quilometros.
  - *Sem Pedagio (Experimental):* Calcula desvios geometricos por rodovias e estradas secundarias isentas de tarifa.
- **Suporte a Ida e Volta:** Duplicacao parametrizada de quilometragem, combustivel e tarifas de ida e volta.
- **Composicao de Custos Extras:** Modulo para computar alimentacao, hospedagem, diaria de motorista, desgaste por quilometro e despesas personalizadas.
- **Geracao e Copia de Relatorios:** Exportacao com um clique em formatos otimizados para WhatsApp e mensagens formais de texto/e-mail.
- **Interface com Tema Claro e Escuro:** Alternador de tema com suporte a tiles vetoriais escuros CartoDB Dark Matter no mapa.

---

## 3. Categorias de Veiculos e Multiplicadores de Pedagio

| Categoria | Descricao | Multiplicador de Pedagio | Consumo Padrao (km/l) |
|---|---|---|---|
| Motocicleta / Triciclo | Veiculo de 2 rodas | 0.5x | 28.0 |
| Carro de Passeio / SUV | Veiculo leve de 2 eixos | 1.0x | 11.5 |
| Van / Utilitario Leve | Furgoneta ou van de carga/passageiros | 1.0x | 9.0 |
| Onibus (2 eixos) | Onibus urbano ou rodoviario padrao | 2.0x | 4.5 |
| Onibus (3 eixos) | Onibus trucado | 3.0x | 3.8 |
| Caminhao Toco / VUC | Caminhao leve de 2 eixos | 2.0x | 6.0 |
| Caminhao Truck | Caminhao pesado de 3 eixos | 3.0x | 4.0 |
| Caminhao Bitruck | Caminhao de 4 eixos | 4.0x | 3.2 |
| Carreta Simples | Cavalo mecanico + semirreboque (5 eixos) | 5.0x | 2.8 |
| Carreta LS / Bitrem | Conjunto de 6 eixos | 6.0x | 2.4 |
| Rodotrem / Treminhao | Combinacao pesada de 7 a 9 eixos | 8.0x | 1.9 |

---

## 4. Tecnologias Utilizadas

- **Frontend:** React 18, TypeScript, Vite
- **Estilizacao:** Tailwind CSS, Lucide React (iconografia)
- **Mapas e Geoprocessamento:** Leaflet, React-Leaflet, CartoDB Dark Matter / OpenStreetMap Tiles
- **Servicos de Roteamento e Geocodificacao:**
  - OSRM (Open Source Routing Machine)
  - Nominatim / Photon Geocoding API
  - Suporte opcional a Google Maps Platform (Directions API e Geocoding API)
- **Testes Automatizados:** Vitest, Testing Library

---

## 5. Estrutura de Diretorios

```text
rota-frete/
|-- .github/
|   `-- workflows/
|       `-- deploy.yml             # Workflow de deploy continuo no GitHub Pages
|-- src/
|   |-- components/
|   |   |-- Form/                 # Inputs de endereco, veiculo, rota e despesas extras
|   |   |-- Map/                  # Componentes do mapa Leaflet, marcadores e controle de zoom
|   |   |-- Report/               # Modal de relatorio e formatacao de texto
|   |   |-- Results/              # Cards de resumo e barra de composicao de custos
|   |   `-- Tolls/                # Gerenciador interativo de pracas de pedagio
|   |-- constants/
|   |   |-- tollDatabase.ts       # Base georreferenciada de pedagios brasileiros
|   |   `-- vehicles.ts           # Presets de veiculos, consumos e combustiveis
|   |-- hooks/
|   |   |-- useDarkMode.ts        # Gerenciamento de tema claro/escuro
|   |   `-- useTripCalculator.ts  # Estado global do calculo e do formulario
|   |-- services/
|   |   |-- geocoding.ts          # Autocomplete e busca de enderecos
|   |   |-- routing.ts            # Calculo de rotas OSRM e desvios sem pedagio
|   |   `-- tollDetection.ts      # Motor de cruzamento de coordenadas de pedagio
|   |-- types/
|   |   `-- trip.ts               # Definicoes de tipos TypeScript
|   |-- utils/
|   |   |-- calculator.ts         # Formulas matematicas de custos
|   |   |-- clipboard.ts          # Utilitario de copia para area de transferencia
|   |   `-- reportGenerator.ts    # Geradores de relatorio para WhatsApp e texto
|   |-- App.tsx                   # Componente raiz da aplicacao
|   |-- index.css                 # Estilos globais e customizacoes do Leaflet
|   `-- main.tsx                  # Ponto de entrada da aplicacao
|-- package.json
|-- tsconfig.json
`-- vite.config.ts
```

---

## 6. Instalacao e Execucao Local

### Pre-requisitos
- Node.js (versao 18 ou superior)
- npm (versao 9 ou superior)

### Passos

1. Clone o repositorio:
   ```bash
   git clone https://github.com/geraldohomero/rota-frete.git
   cd rota-frete
   ```

2. Instale as dependencias:
   ```bash
   npm install
   ```

3. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

4. Acesse a aplicacao no navegador:
   ```text
   http://localhost:5173
   ```

---

## 7. Execucao dos Testes Automatizados

A aplicacao possui uma suite de testes unitarios e de integracao cobrindo calculos matematicos, deteccao de pedagios, roteamento e formatacao de relatorios:

```bash
npm test
```

Para executar os testes com interface grafica ou modo watch:

```bash
npm run test:ui
```

---

## 8. Build e Publicacao no GitHub Pages

### Compilacao de Producao
Para gerar o pacote estatico otimizado:

```bash
npm run build
```

Os arquivos compilados serao gerados no diretorio `dist/`.

### Configuracao no GitHub Pages
O repositorio ja inclui a configuracao de caminho relativo (`base: './'`) e a pipeline automatizada `.github/workflows/deploy.yml`.

Para ativar a publicacao automatica:
1. Acesse o repositorio no GitHub.
2. Navegue ate **Settings** > **Pages**.
3. Na secao **Build and deployment > Source**, selecione **GitHub Actions**.
4. A cada novo push nos branches `main` ou `master`, o build e a publicacao ocorrerao de forma automatica.

---

## 9. Politica de Verificacao de Tarifas

As tarifas de pedagio sao calculadas com base em tabelas de concessoes rodoviarias vigentes e estimativas por eixo. Como os orgaos reguladores (ANTT e agencias estaduais) realizam reajustes periodicos ao longo do ano, recomenda-se que o usuario sempre confira e ajuste manualmente os valores das pracas antes de emitir cobrancas finais a clientes.

---

## 10. Licenca

Este projeto esta sob a licenca MIT. Consulte o arquivo LICENSE para mais detalhes.
