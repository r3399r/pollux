import uniqid from 'uniqid';
import { Question } from 'src/model/Common';
import { polynomial, randomElement, randomIntBetween } from 'src/util/math';

// (ax+b)(cx+d) -> a*c, a*d+b*c, b*d
const distributiveLaw = (): Question => {
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
    q: `\\(${sign === 1 ? '' : '-'}(${polynomial('x', a, b)})(${polynomial(
      'x',
      c,
      d,
    )})\\) 展開為 \\(ax^2+bx+c\\)`,
    a: `\\(${polynomial('x', first * sign, second * sign, third * sign)}\\)`,
    validate: [[first * sign, second * sign, third * sign].join()],
    hint: {
      rules: ['依序填入 a,b,c', '以逗號分隔、無空白'],
      example: '1,2,-5',
    },
  };
};

export default distributiveLaw;
