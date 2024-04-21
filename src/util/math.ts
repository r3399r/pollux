import { MyFraction } from './MyFraction';

export const randomInt = (min: number, max: number) => {
  if (min > max) throw new Error('min must be less than max');

  return Math.floor(Math.random() * (max - min + 1) + min);
};

export const pickRandomElement = <T>(arr: T[]): T => arr[randomInt(0, arr.length - 1)];

export const randomIntExcept = (min: number, max: number, except: number[]) => {
  const choice = [...Array(max - min + 1)]
    .map((v, i) => min + i)
    .filter((v) => !except.includes(v));
  if (choice.length === 0) throw new Error('no choice');

  return pickRandomElement(choice);
};

export const randomFloat = (min: number, max: number, dp = 2) => {
  if (min > max) throw new Error('min must be less than max');

  return parseFloat((Math.random() * (max - min) + min).toFixed(dp));
};

export const randomFraction = (
  min: number,
  max: number,
  minDenominator: number,
  maxDenominator: number,
) => {
  if (min > max) throw new Error('min must be less than max');

  const denominator = randomIntExcept(minDenominator, maxDenominator, [0]);
  const minumum = denominator * min;
  const maximum = denominator * max;
  const numerator = randomIntExcept(
    minumum,
    maximum,
    [...Array(max - min + 1)].map((v, i) => denominator * (min + i)),
  );

  return new MyFraction(numerator, denominator).toFraction();
};

export const gcd = (a: number, b: number): number => {
  if (b === 0) return a;
  else return gcd(b, a % b);
};

export const lcm = (a: number, b: number): number => (a * b) / gcd(a, b);

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
