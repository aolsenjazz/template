import { templateMath } from './template-math';

describe('template-math', () => {
  it('adds two different numbers normally', () => {
    expect(templateMath(2, 3)).toBe(5);
  });

  it("gets 'excited' when both numbers are the same", () => {
    expect(templateMath(4, 4)).toBe(80);
  });

  it('handles zero correctly', () => {
    expect(templateMath(0, 0)).toBe(0);
  });
});
