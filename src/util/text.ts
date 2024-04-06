import { fraction } from './math';

export const coefficient = (c: number, x = '', isLeading = false) => {
  if (c === 0) return '';
  if (isLeading) {
    if (x === '') return `${c}`;
    if (x !== '' && c === 1) return x;
    if (x !== '' && c === -1) return `-${x}`;
  } else {
    if (x === '' && c > 0) return `+${c}`;
    if (x === '' && c < 0) return `${c}`;

    if (x !== '' && c === 1) return `+${x}`;
    if (x !== '' && c === -1) return `-${x}`;
    if (x !== '' && c > 0) return `+${c}${x}`;
  }

  return `${c}${x}`;
};

export const polynomial = (x: string, ...coefficients: number[]) =>
  coefficients
    .map((c, i) => {
      const pow = coefficients.length - i - 1;
      if (pow === 1) return coefficient(c, x, i === 0);
      if (pow === 0) return coefficient(c, '', i === 0);

      return coefficient(c, `${x}^${pow}`, i === 0);
    })
    .join('');

export const fractionText = (denominator: number, numerator: number) => {
  const sign = denominator * numerator < 0 ? -1 : 1;
  const f = fraction(Math.abs(denominator), Math.abs(numerator));
  if (f.denominator === 1)
    return {
      text: (sign * f.numerator).toString(),
      latex: (sign * f.numerator).toString(),
    };

  return {
    text: `${sign > 0 ? '' : '-'}${f.numerator}/${f.denominator}`,
    latex: `${sign > 0 ? '' : '-'}\\dfrac{${f.numerator}}{${f.denominator}}`,
  };
};
