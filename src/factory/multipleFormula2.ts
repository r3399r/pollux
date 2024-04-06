import uniqid from 'uniqid';
import { QuestionValues } from 'src/model/Common';
import { pickRandomElement, randomInt } from 'src/util/math';
import { polynomial } from 'src/util/text';

// (ax+b)^3 -> a^3, 3*a*a*b, 3*a*b*b, b^3
const values = (): QuestionValues => {
  const a = pickRandomElement([1, 1, 1, 2, 2, 3]) * pickRandomElement([-1, 1]);
  const b = randomInt(1, 5) * pickRandomElement([-1, 1]);

  const first = a * a * a;
  const second = 3 * a * a * b;
  const third = 3 * a * b * b;
  const fourth = b * b * b;

  return {
    id: uniqid(),
    qp: [a, b],
    ap: [first, second, third, fourth],
    validate: [[first, second, third, fourth].join()],
    hint: {
      rules: ['依序填入 a,b,c,d', '以逗號或空白分隔'],
      example: '1,-6,9,27',
    },
  };
};

const question = (a: number, b: number) =>
  `\\((${polynomial('x', a, b)})^3\\) 展開為 \\(ax^3+bx^2+cx+d\\)`;

const answer = (first: number, second: number, third: number, fourth: number) =>
  `\\(${polynomial('x', first, second, third, fourth)}\\)`;

export default { values, question, answer };
