import uniqid from 'uniqid';
import { QuestionValues } from 'src/model/Common';
import { primeFactorization as doPrimeFactorization, randomInt } from 'src/util/math';

const values = (): QuestionValues => {
  const q = randomInt(2, 400);

  const factors = doPrimeFactorization(q);

  return {
    id: uniqid(),
    qp: [q],
    ap: factors,
    validate: [factors.join()],
  };
};

const question = (q: number | string) => `將 ${q} 質因數分解`;

const answer = (...factors: (number | string)[]) => {
  const ans: string[] = [];
  for (const b of new Set(factors)) {
    const n = factors.filter((f) => f === b).length;
    ans.push(n === 1 ? `${b}` : `${b}^${n}`);
  }

  return `\\(${ans.join('\\times')}\\)`;
};

export default { values, question, answer };
