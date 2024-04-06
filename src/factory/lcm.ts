import uniqid from 'uniqid';
import { QuestionValues } from 'src/model/Common';
import { lcm as findLcm, randomInt } from 'src/util/math';

const values = (): QuestionValues => {
  const a = randomInt(2, 30);
  const b = randomInt(2, 30);
  const c = findLcm(a, b);

  return { id: uniqid(), qp: [a, b], ap: [c], validate: [`${c}`] };
};

const question = (a: number | string, b: number | string) => `求 ${a} 與 ${b} 的最小公倍數`;

const answer = (c: number | string) => `${c}`;

export default { values, question, answer };
