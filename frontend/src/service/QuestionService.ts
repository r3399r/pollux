import { Generator, Question } from 'src/model/Common';
import { randomIntBetween } from 'src/util/math';

const add = (): Question => {
  const c = randomIntBetween(2, 9);
  const a = randomIntBetween(1, c - 1);
  const b = c - a;

  return { question: `\\(${a}+${b}=\\square\\)`, answer: c.toString() };
};

const minus = (): Question => {
  const c = randomIntBetween(2, 9);
  const a = randomIntBetween(1, c - 1);
  const b = c - a;

  return { question: `\\(${c}-${a}=\\square\\)`, answer: b.toString() };
};

export const generate = (type: keyof Generator): Question => {
  const map: Generator = { add, minus };

  if (!(type in map)) throw new Error(`type ${type} is invalid`);

  return map[type]();
};
