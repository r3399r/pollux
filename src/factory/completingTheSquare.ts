import uniqid from 'uniqid';
import { QuestionValues } from 'src/model/Common';
import { pickRandomElement, randomInt } from 'src/util/math';
import { polynomial } from 'src/util/text';

const values = (): QuestionValues => {
  const a = pickRandomElement([1, 1, 1, 2, 2, 3]) * pickRandomElement([-1, 1]);
  const h = pickRandomElement([1, 1, 1, 2, 2, 3, 4, 5]) * pickRandomElement([-1, 1]);
  const k = randomInt(-10, 10);

  const b = 2 * a * h;
  const c = a * h * h + k;

  return {
    id: uniqid(),
    qp: [a, b, c],
    ap: [h, a, k],
    validate: [[a, h, k].join()],
  };
};

const question = (a: number | string, b: number | string, c: number | string) => {
  if (typeof a === 'string') a = Number(a);
  if (typeof b === 'string') b = Number(b);
  if (typeof c === 'string') c = Number(c);

  return `\\(${polynomial('x', a, b, c)}\\) 配方成 \\(a(x+h)^2+k\\)`;
};

const answer = (h: number | string, a: number | string, k: number | string) => {
  if (typeof h === 'string') h = Number(h);
  if (typeof a === 'string') a = Number(a);
  if (typeof k === 'string') k = Number(k);

  return `\\(${polynomial(`(${polynomial('x', 1, h)})`, a, 0, k)}\\)`;
};

export default { values, question, answer };
