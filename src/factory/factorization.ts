import uniqid from 'uniqid';
import { QuestionValues } from 'src/model/Common';
import { gcd, pickRandomElement, randomInt } from 'src/util/math';
import { coefficient, polynomial } from 'src/util/text';

// (ax+b)(cx+d) -> a*c, a*d+b*c, b*d
const values = (): QuestionValues => {
  const a = pickRandomElement([1, 1, 1, 2, 2, 3]) * pickRandomElement([-1, 1]);
  const c = pickRandomElement([1, 1, 1, 2, 2, 3]) * pickRandomElement([-1, 1]);
  const b = randomInt(-10, 10);
  const d = randomInt(1, 10) * pickRandomElement([-1, 1]);

  const gcd1 = b === 0 ? a : (gcd(Math.abs(a), Math.abs(b)) * a) / Math.abs(a);
  const gcd2 = d === 0 ? c : (gcd(Math.abs(c), Math.abs(d)) * c) / Math.abs(c);
  const leading = gcd1 * gcd2;
  const a1 = a / gcd1;
  const b1 = b / gcd1;
  const c1 = c / gcd2;
  const d1 = d / gcd2;

  const validate = [[leading, a1, b1, c1, d1].join(), [leading, c1, d1, a1, b1].join()];

  return {
    id: uniqid(),
    qp: [a, b, c, d],
    ap: [leading, b, d, a1, b1, c1, d1],
    validate,
  };
};

const question = (
  a: number | string,
  b: number | string,
  c: number | string,
  d: number | string,
) => {
  if (typeof a === 'string') a = Number(a);
  if (typeof b === 'string') b = Number(b);
  if (typeof c === 'string') c = Number(c);
  if (typeof d === 'string') d = Number(d);

  return `將 \\(${polynomial('x', a * c, a * d + b * c, b * d)}\\) 化簡為 \\(k(ax+b)(cx+d)\\)`;
};

const answer = (
  leading: number | string,
  b: number | string,
  d: number | string,
  a1: number | string,
  b1: number | string,
  c1: number | string,
  d1: number | string,
) => {
  if (typeof a1 === 'string') a1 = Number(a1);
  if (typeof b1 === 'string') b1 = Number(b1);
  if (typeof c1 === 'string') c1 = Number(c1);
  if (typeof d1 === 'string') d1 = Number(d1);
  if (typeof leading === 'string') leading = Number(leading);

  const first = b === 0 ? 'x' : `(${polynomial('x', a1, b1)})`;
  const second = d === 0 ? 'x' : `(${polynomial('x', c1, d1)})`;

  return `\\(${coefficient(leading, `${first}${second}`, true)}\\)`;
};

export default { values, question, answer };
