export const randomIntBetween = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1) + min);

export const findGcf = (a: number, b: number): number => {
  if (b === 0) return a;
  else return findGcf(b, a % b);
};
