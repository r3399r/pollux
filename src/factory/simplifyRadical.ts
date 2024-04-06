import uniqid from 'uniqid';
import { QuestionValues } from 'src/model/Common';
import { simplifyRadical as doSimplifyRadical, randomInt } from 'src/util/math';

const values = (): QuestionValues => {
  let c = 1;
  let n = 1;
  let q = 1;

  while (c === 1 || n === 1) {
    q = randomInt(8, 400);
    const res = doSimplifyRadical(q);
    c = res.coefficient;
    n = res.n;
  }

  return {
    id: uniqid(),
    qp: [q],
    ap: [c, n],
    validate: [`${c},${n}`],
    hint: {
      rules: ['依序填入 a,b', '化至最簡', '以逗號或空白分隔'],
      example: '2,2,3,3,5',
    },
  };
};

const question = (q: number) => `化簡 \\(\\sqrt{${q}}=a\\sqrt b\\)`;

const answer = (c: number, n: number) => `\\(${c}\\sqrt{${n}}\\)`;

export default { values, question, answer };
