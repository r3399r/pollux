import uniqid from 'uniqid';
import { QuestionValues } from 'src/model/Common';
import { randomIntBetween } from 'src/util/math';

const values = (): QuestionValues => {
  const c = randomIntBetween(0, 10);
  const a = randomIntBetween(0, c);
  const b = c - a;

  return {
    id: uniqid(),
    qp: [a, b],
    ap: [c],
    validate: [`${c}`],
  };
};

const question = (a: number, b: number) => `\\(${a}+${b}=\\square\\)`;

const answer = (c: number) => `${c}`;

export default { values, question, answer };
