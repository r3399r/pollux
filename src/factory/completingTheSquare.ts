import uniqid from 'uniqid';
import { Question } from 'src/model/Common';
import { polynomial, randomElement, randomIntBetween } from 'src/util/math';

const completingTheSquare = (): Question => {
  const a = randomElement([1, 1, 1, 2, 2, 3]) * randomElement([-1, 1]);
  const h = randomElement([1, 1, 1, 2, 2, 3, 4, 5]) * randomElement([-1, 1]);
  const k = randomIntBetween(-10, 10);

  const b = 2 * a * h;
  const c = a * h * h + k;

  return {
    id: uniqid(),
    q: `\\(${polynomial('x', a, b, c)}\\) 配方成 \\(a(x+h)^2+k\\)`,
    a: `\\(${polynomial(`(${polynomial('x', 1, h)})`, a, 0, k)}\\)`,
    validate: [[a, h, k].join()],
    hint: {
      rules: ['依序填入 a,h,k', '以逗號分隔、無空白'],
      example: '2,-1,3',
    },
  };
};

export default completingTheSquare;
