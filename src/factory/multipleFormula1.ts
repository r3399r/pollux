import uniqid from 'uniqid';
import { Question } from 'src/model/Common';
import { polynomial, randomElement, randomIntBetween } from 'src/util/math';

const multipleFormula1 = (): Question => {
  const a = randomElement([1, 1, 1, 2, 2, 3, 4, 5]) * randomElement([-1, 1]);
  const b = randomIntBetween(1, 10) * randomElement([-1, 1]);
  let q = '';
  let first = a * a;
  let second = 0;
  let third = b * b;

  // 1: (ax+b)^2 -> a^2, 2*a*b, b^2, 2: (a+b)(a-b) -> a^2, b^2
  const type = randomIntBetween(1, 2);
  switch (type) {
    case 1:
      q = `\\((${polynomial('x', a, b)})^2\\) 展開為 \\(ax^2+bx+c\\)`;
      second = 2 * a * b;
      break;
    case 2:
      q = `\\((${polynomial('x', a, b)})(${polynomial('x', a, b * -1)})\\) 展開為 \\(ax^2+bx+c\\)`;
      first = a * a;
      third = -1 * b * b;
      break;
  }

  return {
    id: uniqid(),
    q,
    a: `\\(${polynomial('x', first, second, third)}\\)`,
    validate: [[first, second, third].join()],
    hint: {
      rules: ['依序填入 a,b,c', '以逗號分隔、無空白'],
      example: '1,-4,4',
    },
  };
};

export default multipleFormula1;
