export const randomIntBetween = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1) + min);

export const randomElement = <T>(arr: T[]): T => arr[randomIntBetween(0, arr.length - 1)];

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
