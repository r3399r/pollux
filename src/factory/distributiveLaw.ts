import uniqid from 'uniqid';
import { QuestionValues } from 'src/model/Common';
import { polynomial, randomElement, randomIntBetween } from 'src/util/math';

// (ax+b)(cx+d) -> a*c, a*d+b*c, b*d
const values = (): QuestionValues => {
  const sign = randomElement([-1, 1, 1, 1, 1]);
  const a = randomElement([1, 1, 1, 2, 2, 3, 4, 5]) * randomElement([-1, 1]);
  const c = randomElement([1, 1, 1, 2, 2, 3, 4, 5]) * randomElement([-1, 1]);
  const b = randomIntBetween(1, 10) * randomElement([-1, 1]);
  const d = randomIntBetween(1, 10) * randomElement([-1, 1]);

  const first = a * c;
  const second = a * d + b * c;
  const third = b * d;

  return {
    id: uniqid(),
    qp: [sign, a, b, c, d],
    ap: [sign, first, second, third],
    validate: [[first * sign, second * sign, third * sign].join()],
    hint: {
      rules: ['依序填入 a,b,c', '以逗號或空白分隔'],
      example: '1,2,-5',
    },
  };
};

const question = (sign: number, a: number, b: number, c: number, d: number) =>
  `\\(${sign === 1 ? '' : '-'}(${polynomial('x', a, b)})(${polynomial(
    'x',
    c,
    d,
  )})\\) 展開為 \\(ax^2+bx+c\\)`;

const answer = (sign: number, first: number, second: number, third: number) =>
  `\\(${polynomial('x', first * sign, second * sign, third * sign)}\\)`;

export default { values, question, answer };
