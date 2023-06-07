import { Question } from 'src/model/Common';
import { randomIntBetween } from './math';

export const add10 = (): Question => {
  const c = randomIntBetween(2, 9);
  const a = randomIntBetween(1, c - 1);
  const b = c - a;

  return { q: `\\(${a}+${b}=\\square\\)`, a: c.toString() };
};

export const minus10 = (): Question => {
  const c = randomIntBetween(2, 9);
  const a = randomIntBetween(1, c - 1);
  const b = c - a;

  return { q: `\\(${c}-${a}=\\square\\)`, a: b.toString() };
};
