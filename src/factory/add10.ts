import uniqid from 'uniqid';
import { QuestionValues } from 'src/model/Common';
import { randomInt } from 'src/util/math';

const values = (): QuestionValues => {
  const c = randomInt(0, 10);
  const a = randomInt(0, c);
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
