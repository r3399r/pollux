import uniqid from 'uniqid';
import { QuestionValues } from 'src/model/Common';
import { gcd as findGcd, pickRandomElement, randomInt } from 'src/util/math';

const values = (): QuestionValues => {
  const base = pickRandomElement([1, 2, 3, 5, 7, 11, 13, 17, 19, 23, 29]);
  const a = base * randomInt(1, 20);
  const b = base * randomInt(1, 20);
  const c = findGcd(a, b);

  return {
    id: uniqid(),
    qp: [a, b],
    ap: [c],
    validate: [`${c}`],
  };
};

const question = (a: number | string, b: number | string) => `求 ${a} 與 ${b} 的最大公因數`;

const answer = (c: number | string) => `${c}`;

export default { values, question, answer };
