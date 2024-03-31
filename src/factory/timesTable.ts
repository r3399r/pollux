import uniqid from 'uniqid';
import { QuestionValues } from 'src/model/Common';
import { randomIntBetween } from 'src/util/math';

const values = (): QuestionValues => {
  const a = randomIntBetween(1, 9);
  const b = randomIntBetween(1, 9);
  const c = a * b;

  return {
    id: uniqid(),
    qp: [a, b],
    ap: [c],
    validate: [`${c}`],
  };
};

const question = (a: number, b: number) => `\\(${a}\\times${b}=\\square\\)`;

const answer = (c: number) => `${c}`;

export default { values, question, answer };
