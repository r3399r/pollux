import uniqid from 'uniqid';
import { Question } from 'src/model/Common';
import { primeFactorization as doPrimeFactorization, randomIntBetween } from 'src/util/math';

const primeFactorization = (): Question => {
  const q = randomIntBetween(2, 400);

  const factors = doPrimeFactorization(q);

  const ans: string[] = [];
  for (const b of new Set(factors)) {
    const n = factors.filter((f) => f === b).length;
    ans.push(n === 1 ? `${b}` : `${b}^${n}`);
  }

  return {
    id: uniqid(),
    q: `將 ${q} 質因數分解`,
    a: `\\(${ans.join('\\times')}\\)`,
    validate: [factors.join()],
    hint: {
      rules: ['質因數由小到大排列', '重複的質因數請重複輸入', '以逗號分隔、無空白'],
      example: '2,2,3,3,5',
    },
  };
};

export default primeFactorization;
