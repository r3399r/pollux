import uniqid from 'uniqid';
import { QuestionValues } from 'src/model/Common';
import { randomFloatBetween, randomIntBetween } from 'src/util/math';

const values = (): QuestionValues => {
  const m = randomFloatBetween(1, 9.99, 2);
  const n = randomIntBetween(-10, 10);

  return {
    id: uniqid(),
    qp: [m, n],
    ap: [m, n],
    validate: [n >= 0 ? `${n + 1}` : `${-n}`],
  };
};

const question = (m: number, n: number) =>
  n >= 0
    ? `\\(${m}\\times10^${n}\\) 是幾位數？`
    : `\\(${m}\\times10^{${n}}\\) 從小數點後第幾位開始不為 0？`;

const answer = (m: number, n: number) => `\\(${m}\\times10^{${n}}\\)`;

export default { values, question, answer };
