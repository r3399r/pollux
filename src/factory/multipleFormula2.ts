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
  };
};

const question = (a: number | string, b: number | string) => {
  if (typeof a === 'string') a = Number(a);
  if (typeof b === 'string') b = Number(b);

  return `\\((${polynomial('x', a, b)})^3\\) 展開為 \\(ax^3+bx^2+cx+d\\)`;
};

const answer = (
  first: number | string,
  second: number | string,
  third: number | string,
  fourth: number | string,
) => {
  if (typeof first === 'string') first = Number(first);
  if (typeof second === 'string') second = Number(second);
  if (typeof third === 'string') third = Number(third);
  if (typeof fourth === 'string') fourth = Number(fourth);

  return `\\(${polynomial('x', first, second, third, fourth)}\\)`;
};

export default { values, question, answer };
