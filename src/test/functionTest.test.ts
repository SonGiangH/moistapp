import { calculateWetMass, calculateDryMass, calculateWaterContent } from '../lib/calculationsMass';
import { describe, it, expect } from 'vitest';

describe('Material Wet Mass', () => {
  it('Should equal', () => {
    expect(calculateWetMass(2859.6, 300)).eq(2559.6);
  });
});

describe('Material Dry Mass', () => {
  it('Should equal', () => {
    expect(calculateDryMass(2525.7, 300)).eq(2225.7)
  });
});

describe('Water Content', () => {
  it('Should equal', () => {
    expect(calculateWaterContent(2859.6, 2525.7, 300, "A")).eq(15)
  });
});
