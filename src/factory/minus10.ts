import uniqid from 'uniqid';
import { QuestionValues } from 'src/model/Common';
import { randomInt } from 'src/util/math';

const values = (): QuestionValues => {
  const c = randomInt(0, 10);
  const a = randomInt(0, c);
  const b = c - a;

  return { id: uniqid(), qp: [c, a], ap: [b], validate: [`${b}`] };
};

const question = (c: number | string, a: number | string) => `\\(${c}-${a}=\\square\\)`;

const answer = (b: number | string) => `${b}`;

export default { values, question, answer };
