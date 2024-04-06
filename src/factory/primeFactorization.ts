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
    hint: {
      rules: ['質因數由小到大排列', '重複的質因數請重複輸入', '以逗號或空白分隔'],
      example: '2,2,3,3,5',
    },
  };
};

const question = (q: number) => `將 ${q} 質因數分解`;

const answer = (...factors: number[]) => {
  const ans: string[] = [];
  for (const b of new Set(factors)) {
    const n = factors.filter((f) => f === b).length;
    ans.push(n === 1 ? `${b}` : `${b}^${n}`);
  }

  return `\\(${ans.join('\\times')}\\)`;
};

export default { values, question, answer };
