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
    hint: {
      rules: ['依序填入 a,n', '\\(n\\) 為整數且 \\(1\\le a<10\\)', '以逗號或空白分隔'],
      example: '3.42 -2',
    },
  };
};

const question = (m: number, n: number) => {
  const q = bn(10).pow(n).times(m).toFixed();

  return `\\(${q}=a\\times10^n\\)`;
};

const answer = (m: number, n: number) => `\\(${m}\\times10^{${n}}\\)`;

export default { values, question, answer };
