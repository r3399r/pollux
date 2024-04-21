import uniqid from 'uniqid';
import { QuestionValues } from 'src/model/Common';
import { pickRandomElement, randomInt } from 'src/util/math';
import { polynomial } from 'src/util/text';

// (ax+b)(cx+d) -> a*c, a*d+b*c, b*d
const values = (): QuestionValues => {
  const sign = pickRandomElement([-1, 1, 1, 1, 1]);
  const a = pickRandomElement([1, 1, 1, 2, 2, 3, 4, 5]) * pickRandomElement([-1, 1]);
  const c = pickRandomElement([1, 1, 1, 2, 2, 3, 4, 5]) * pickRandomElement([-1, 1]);
  const b = randomInt(1, 10) * pickRandomElement([-1, 1]);
  const d = randomInt(1, 10) * pickRandomElement([-1, 1]);

  const first = a * c;
  const second = a * d + b * c;
  const third = b * d;

  return {
    id: uniqid(),
    qp: [sign, a, b, c, d],
    ap: [sign, first, second, third],
    validate: [[first * sign, second * sign, third * sign].join()],
  };
};

const question = (
  sign: number | string,
  a: number | string,
  b: number | string,
  c: number | string,
  d: number | string,
) => {
  if (typeof a === 'string') a = Number(a);
  if (typeof b === 'string') b = Number(b);
  if (typeof c === 'string') c = Number(c);
  if (typeof d === 'string') d = Number(d);

  return `\\(${sign === 1 ? '' : '-'}(${polynomial('x', a, b)})(${polynomial(
    'x',
    c,
    d,
  )})\\) 展開為 \\(ax^2+bx+c\\)`;
};

const answer = (
  sign: number | string,
  first: number | string,
  second: number | string,
  third: number | string,
) => {
  if (typeof sign === 'string') sign = Number(sign);
  if (typeof first === 'string') first = Number(first);
  if (typeof second === 'string') second = Number(second);
  if (typeof third === 'string') third = Number(third);

  return `\\(${polynomial('x', first * sign, second * sign, third * sign)}\\)`;
};

export default { values, question, answer };
