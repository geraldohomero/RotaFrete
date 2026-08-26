import { describe, it, expect } from 'vitest';
import { detectTollsOnRoute } from './tollDetection';

describe('Real World Brazilian Route Toll Count Verification', () => {
  it('detects exactly 7 toll booths between São Paulo and Petrópolis', () => {
    // Realistic trajectory traversing SP -> Dutra (Arujá, Guararema, Jacareí, Moreira César, Itatiaia, Viúva Graça) -> BR-040 (Xerém) -> Petrópolis
    const mockSPtoPetropolisRoute: [number, number][] = [
      [-46.6333, -23.5505], // São Paulo
      [-46.329358, -23.403266], // Pedágio Arujá (Km 204)
      [-46.015864, -23.300348], // Pedágio Guararema (Km 182)
      [-45.979313, -23.278319], // Pedágio Jacareí (Km 165)
      [-45.356493, -22.928105], // Pedágio Moreira César (Km 88)
      [-44.571498, -22.495686], // Pedágio Itatiaia (Km 318)
      [-43.709862, -22.717297], // Pedágio Viúva Graça (Km 207)
      [-43.285421, -22.610632], // Pedágio Duque de Caxias / Xerém (Km 102)
      [-43.1824, -22.5048], // Petrópolis
    ];

    const detected = detectTollsOnRoute(mockSPtoPetropolisRoute, 1.0);

    // Must be EXACTLY 7 toll booths (6 on Dutra + 1 on BR-040 Xerém)
    expect(detected.length).toBe(7);
    expect(detected[0].name).toContain('Arujá');
    expect(detected[1].name).toContain('Guararema');
    expect(detected[2].name).toContain('Jacareí');
    expect(detected[3].name).toContain('Moreira César');
    expect(detected[4].name).toContain('Itatiaia');
    expect(detected[5].name).toContain('Viúva Graça');
    expect(detected[6].name).toContain('Xerém');
  });

  it('detects exactly 2 toll booths between Juiz de Fora and Petrópolis', () => {
    // Realistic trajectory traversing Juiz de Fora -> BR-040 (Simão Pereira, Areal) -> Petrópolis
    const mockJFtoPetropolisRoute: [number, number][] = [
      [-43.3496, -21.7642], // Juiz de Fora
      [-43.310247, -21.937536], // Pedágio Simão Pereira (Km 816)
      [-43.119223, -22.231009], // Pedágio Areal / Petrópolis (Km 45)
      [-43.1824, -22.5048], // Petrópolis
    ];

    const detected = detectTollsOnRoute(mockJFtoPetropolisRoute, 1.0);

    // Must be EXACTLY 2 toll booths on BR-040 (Simão Pereira + Areal)
    expect(detected.length).toBe(2);
    expect(detected[0].name).toContain('Simão Pereira');
    expect(detected[1].name).toContain('Areal');
  });
});
