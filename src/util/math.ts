export const randomIntBetween = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1) + min);

export const randomElement = <T>(arr: T[]): T => arr[randomIntBetween(0, arr.length - 1)];

export const randomElementExcept = <T>(arr: T[], except: T): T => {
  let element: T;
  do element = randomElement(arr);
  while (element === except);

  return element;
};

export const gcd = (a: number, b: number): number => {
  if (b === 0) return a;
  else return gcd(b, a % b);
};

export const lcm = (a: number, b: number): number => (a * b) / gcd(a, b);

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

export const primeFactorization = (n: number) => {
  const factors: number[] = [];
  let i = 2;
  while (i * i <= n)
    if (n % i === 0) {
      factors.push(i);
      n = n / i;
    } else i = i + 1;

  if (n > 1) factors.push(n);

  return factors;
};

export const simplifyRadical = (n: number) => {
  const factors = primeFactorization(n);
  const counts = new Set<number>();
  let coefficient = 1;
  for (const f of factors)
    if (counts.has(f)) {
      coefficient = coefficient * f;
      n = n / f / f;
      counts.delete(f);
    } else counts.add(f);

  return { coefficient, n };
};

export const rationalizeSingle = (denominator: number, numerator: number) => {
  const d = gcd(denominator, numerator);
  denominator = denominator / d;
  numerator = numerator / d;

  const numerator2 = simplifyRadical(numerator * denominator);

  const d2 = gcd(numerator2.coefficient, denominator);

  return {
    denominator: denominator / d2,
    numeratorCoefficient: numerator2.coefficient / d2,
    numeratorRadical: numerator2.n,
  };
};
