import uniqid from 'uniqid';
import { QuestionValues } from 'src/model/Common';
import { randomFloat, randomInt } from 'src/util/math';

const values = (): QuestionValues => {
  const m = randomFloat(1, 9.99, 2);
  const n = randomInt(-10, 10);

  return {
    id: uniqid(),
    qp: [m, n],
    ap: [m, n],
    validate: [n >= 0 ? `${n + 1}` : `${-n}`],
  };
};

const question = (m: number | string, n: number | string) => {
  if (typeof n === 'string') n = Number(n);

  return n >= 0
    ? `\\(${m}\\times10^${n}\\) 是幾位數？`
    : `\\(${m}\\times10^{${n}}\\) 從小數點後第幾位開始不為 0？`;
};

const answer = (m: number | string, n: number | string) => `\\(${m}\\times10^{${n}}\\)`;

export default { values, question, answer };
