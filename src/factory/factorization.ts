import uniqid from 'uniqid';
import { Question } from 'src/model/Common';
import { coefficient, gcd, polynomial, randomElement, randomIntBetween } from 'src/util/math';

// (ax+b)(cx+d) -> a*c, a*d+b*c, b*d
const factorization = (): Question => {
  const a = randomElement([1, 1, 1, 2, 2, 3]) * randomElement([-1, 1]);
  const c = randomElement([1, 1, 1, 2, 2, 3]) * randomElement([-1, 1]);
  const b = randomIntBetween(-10, 10);
  const d = randomIntBetween(1, 10) * randomElement([-1, 1]);

  const gcd1 = b === 0 ? a : (gcd(Math.abs(a), Math.abs(b)) * a) / Math.abs(a);
  const gcd2 = d === 0 ? c : (gcd(Math.abs(c), Math.abs(d)) * c) / Math.abs(c);
  const leading = gcd1 * gcd2;
  const a1 = a / gcd1;
  const b1 = b / gcd1;
  const c1 = c / gcd2;
  const d1 = d / gcd2;

  const first = b === 0 ? 'x' : `(${polynomial('x', a1, b1)})`;
  const second = d === 0 ? 'x' : `(${polynomial('x', c1, d1)})`;

  const validate = [[leading, a1, b1, c1, d1].join(), [leading, c1, d1, a1, b1].join()];

  return {
    id: uniqid(),
    q: `將 \\(${polynomial('x', a * c, a * d + b * c, b * d)}\\) 化簡為 \\(k(ax+b)(cx+d)\\)`,
    a: `\\(${coefficient(leading, `${first}${second}`, true)}\\)`,
    validate,
    hint: {
      rules: ['依序填入 k,a,b,c,d', 'a,c 為正數', '以逗號分隔、無空白'],
      example: '-1,2,-3,1,4',
    },
  };
};

export default factorization;
