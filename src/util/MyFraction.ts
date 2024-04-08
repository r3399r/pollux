import Fraction from 'fraction.js';

export class MyFraction extends Fraction {
  toLatex(excludeWhole?: boolean | undefined): string {
    const latex = super.toLatex(excludeWhole);

    return latex.replace(/\\frac/g, '\\dfrac');
  }
}
