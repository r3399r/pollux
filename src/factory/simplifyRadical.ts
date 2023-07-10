import uniqid from 'uniqid';
import { Question } from 'src/model/Common';
import { simplifyRadical as doSimplifyRadical, randomIntBetween } from 'src/util/math';

const simplifyRadical = (): Question => {
  let c = 1;
  let n = 1;
  let q = 1;

  while (c === 1 || n === 1) {
    q = randomIntBetween(8, 400);
    const res = doSimplifyRadical(q);
    c = res.coefficient;
    n = res.n;
  }

  return {
    id: uniqid(),
    q: `化簡 \\(\\sqrt{${q}}=a\\sqrt b\\)`,
    a: `\\(${c}\\sqrt{${n}}\\)`,
    validate: [`${c},${n}`],
    hint: {
      rules: ['依序填入 a,b', '化至最簡', '以逗號或空白分隔'],
      example: '2,2,3,3,5',
    },
  };
};

export default simplifyRadical;
