import uniqid from 'uniqid';
import { QuestionValues } from 'src/model/Common';
import { polynomial, randomElement, randomIntBetween } from 'src/util/math';

const values = (): QuestionValues => {
  const a = randomElement([1, 1, 1, 2, 2, 3]) * randomElement([-1, 1]);
  const h = randomElement([1, 1, 1, 2, 2, 3, 4, 5]) * randomElement([-1, 1]);
  const k = randomIntBetween(-10, 10);

  const b = 2 * a * h;
  const c = a * h * h + k;

  return {
    id: uniqid(),
    qp: [a, b, c],
    ap: [h, a, k],
    validate: [[a, h, k].join()],
    hint: {
      rules: ['依序填入 a,h,k', '以逗號或空白分隔'],
      example: '2,-1,3',
    },
  };
};

const question = (a: number, b: number, c: number) =>
  `\\(${polynomial('x', a, b, c)}\\) 配方成 \\(a(x+h)^2+k\\)`;

const answer = (h: number, a: number, k: number) =>
  `\\(${polynomial(`(${polynomial('x', 1, h)})`, a, 0, k)}\\)`;

export default { values, question, answer };
