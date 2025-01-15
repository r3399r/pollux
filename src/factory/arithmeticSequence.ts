import uniqid from 'uniqid';
import { QuestionValues } from 'src/model/Common';
import { randomInt, randomIntExcept } from 'src/util/math';

const values = (): QuestionValues => {
  const term1 = randomInt(-10, 10);
  const commonDiff = randomIntExcept(-8, 8, [-1, 0, 1]);

  const n1 = randomInt(10, 15);
  const termN1 = term1 + (n1 - 1) * commonDiff;
  const n2 = randomInt(16, 30);
  const termN2 = term1 + (n2 - 1) * commonDiff;
  const target = randomInt(31, 40);
  const termTarget = term1 + (target - 1) * commonDiff;

  return {
    id: uniqid(),
    qp: [n1, termN1, n2, termN2, target],
    ap: [termTarget],
    validate: [termTarget.toString()],
  };
};

const question = (
  n1: number | string,
  termN1: number | string,
  n2: number | string,
  termN2: number | string,
  target: number | string,
) => `等差數列的第 ${n1} 項為 ${termN1}，第 ${n2} 項為 ${termN2}，求第 ${target} 項`;

const answer = (termTarget: number | string) => termTarget.toString();

export default { values, question, answer };
