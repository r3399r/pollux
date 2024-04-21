import uniqid from 'uniqid';
import { QuestionValues } from 'src/model/Common';
import { randomInt } from 'src/util/math';

const values = (): QuestionValues => {
  const a = randomInt(1, 9);
  const b = randomInt(1, 9);
  const c = a * b;

  return {
    id: uniqid(),
    qp: [a, b],
    ap: [c],
    validate: [`${c}`],
  };
};

const question = (a: number | string, b: number | string) => `\\(${a}\\times${b}=\\square\\)`;

const answer = (c: number | string) => `${c}`;

export default { values, question, answer };
