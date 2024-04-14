import uniqid from 'uniqid';
import { QuestionValues } from 'src/model/Common';
import { bn } from 'src/util/bignumber';
import { randomFloat, randomInt } from 'src/util/math';

const values = (): QuestionValues => {
  const m = randomFloat(1, 9.99, 2);
  const n = randomInt(-10, 10);

  return {
    id: uniqid(),
    qp: [m, n],
    ap: [m, n],
    validate: [`${m},${n}`],
  };
};

const question = (m: number | string, n: number | string) => {
  const q = bn(10).pow(n).times(m).toFixed();

  return `\\(${q}=a\\times10^n\\)`;
};

const answer = (m: number | string, n: number | string) => `\\(${m}\\times10^{${n}}\\)`;

export default { values, question, answer };
