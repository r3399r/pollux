import Fraction from 'fraction.js';

export const coefficient = (c: number | string, x = '', isLeading = false) => {
  const f = new Fraction(c);
  if (typeof c === 'string') c = f.toLatex();
  if (f.equals(0)) return '';
  if (isLeading) {
    if (x === '') return `${c}`;
    if (x !== '' && f.equals(1)) return x;
    if (x !== '' && f.equals(-1)) return `-${x}`;
  } else {
    if (x === '' && f.compare(0) > 0) return `+${c}`;
    if (x === '' && f.compare(0) < 0) return `${c}`;

    if (x !== '' && f.equals(1)) return `+${x}`;
    if (x !== '' && f.equals(-1)) return `-${x}`;
    if (x !== '' && f.compare(0) > 0) return `+${c}${x}`;
  }

  return `${c}${x}`;
};

export const polynomial = (x: string, ...coefficients: (number | string)[]) => {
  for (let j = 0; j < coefficients.length; j++)
    if (Number(coefficients[j]) !== 0) {
      coefficients = coefficients.slice(j);
      break;
    }

  return coefficients
    .map((c, i) => {
      const pow = coefficients.length - i - 1;
      if (pow === 1) return coefficient(c, x, i === 0);
      if (pow === 0) return coefficient(c, '', i === 0);

      return coefficient(c, `${x}^${pow}`, i === 0);
    })
    .join('');
};
