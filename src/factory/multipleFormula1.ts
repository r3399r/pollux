import uniqid from 'uniqid';
import { QuestionValues } from 'src/model/Common';
import { pickRandomElement, randomInt } from 'src/util/math';
import { polynomial } from 'src/util/text';

const values = (): QuestionValues => {
  const a = pickRandomElement([1, 1, 1, 2, 2, 3, 4, 5]) * pickRandomElement([-1, 1]);
  const b = randomInt(1, 10) * pickRandomElement([-1, 1]);
  let first = a * a;
  let second = 0;
  let third = b * b;

  // 1: (ax+b)^2 -> a^2, 2*a*b, b^2, 2: (a+b)(a-b) -> a^2, b^2
  const type = randomInt(1, 2);
  switch (type) {
    case 1:
      second = 2 * a * b;
      break;
    case 2:
      first = a * a;
      third = -1 * b * b;
      break;
  }

  return {
    id: uniqid(),
    qp: [type, a, b],
    ap: [first, second, third],
    validate: [[first, second, third].join()],
    hint: {
      rules: ['依序填入 a,b,c', '以逗號或空白分隔'],
      example: '1,-4,4',
    },
  };
};

const question = (type: number | string, a: number | string, b: number | string) => {
  if (typeof a === 'string') a = Number(a);
  if (typeof b === 'string') b = Number(b);

  switch (type) {
    case 1:
      return `\\((${polynomial('x', a, b)})^2\\) 展開為 \\(ax^2+bx+c\\)`;
    case 2:
      return `\\((${polynomial('x', a, b)})(${polynomial(
        'x',
        a,
        b * -1,
      )})\\) 展開為 \\(ax^2+bx+c\\)`;
  }

  return '';
};

const answer = (first: number | string, second: number | string, third: number | string) => {
  if (typeof first === 'string') first = Number(first);
  if (typeof second === 'string') second = Number(second);
  if (typeof third === 'string') third = Number(third);

  return `\\(${polynomial('x', first, second, third)}\\)`;
};

export default { values, question, answer };
