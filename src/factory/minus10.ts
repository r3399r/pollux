import uniqid from 'uniqid';
import { Question } from 'src/model/Common';
import { randomIntBetween } from 'src/util/math';

const values = (): Question => {
  const c = randomIntBetween(0, 10);
  const a = randomIntBetween(0, c);
  const b = c - a;

  return { id: uniqid(), qp: [c, a], ap: [b], validate: [`${b}`] };
};

const question = (c: number, a: number) => `\\(${c}-${a}=\\square\\)`;

const answer = (b: number) => `${b}`;

export default { values, question, answer };
