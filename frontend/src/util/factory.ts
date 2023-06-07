import uniqid from 'uniqid';
import { Factory, Question } from 'src/model/Common';
import { findGcf, randomIntBetween } from './math';

const add10 = (): Question => {
  const c = randomIntBetween(0, 10);
  const a = randomIntBetween(0, c);
  const b = c - a;

  return { id: uniqid(), q: `\\(${a}+${b}=\\square\\)`, a: c.toString() };
};

const minus10 = (): Question => {
  const c = randomIntBetween(0, 10);
  const a = randomIntBetween(0, c);
  const b = c - a;

  return { id: uniqid(), q: `\\(${c}-${a}=\\square\\)`, a: b.toString() };
};

const add20 = (): Question => {
  const a = randomIntBetween(0, 20);
  const b = a < 11 ? randomIntBetween(11 - a, 20 - a) : randomIntBetween(0, 20 - a);
  const c = a + b;

  return { id: uniqid(), q: `\\(${a}+${b}=\\square\\)`, a: c.toString() };
};

const minus20 = (): Question => {
  const c = randomIntBetween(10, 20);
  const a = randomIntBetween(0, c);
  const b = c - a;

  return { id: uniqid(), q: `\\(${c}-${a}=\\square\\)`, a: b.toString() };
};

const gcf = (): Question => {
  const a = randomIntBetween(1, 100);
  const b = randomIntBetween(1, 100);
  const c = findGcf(a, b);

  return { id: uniqid(), q: `求 ${a} 與 ${b} 的最大公因數`, a: c.toString() };
};

export const factory: Factory = {
  add10,
  minus10,
  add20,
  minus20,
  gcf,
};
