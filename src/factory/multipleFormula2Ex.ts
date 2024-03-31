import uniqid from 'uniqid';
import { QuestionValues } from 'src/model/Common';
import { randomElement, randomIntBetween } from 'src/util/math';

// given x±1/x, find x^2+1/x^2 and x^3±1/x^3
const values = (): QuestionValues => {
  let given = 0;
  let a = 0;
  let b = 0;

  const pm = randomElement([1, -1]) as 1 | -1;
  given = randomIntBetween(3, 8);

  switch (pm) {
    case 1:
      a = given * given - 2;
      b = given * (a - 1);
      break;
    case -1:
      given = given * randomElement([1, -1]);
      a = given * given + 2;
      b = given * (a + 1);
      break;
  }

  return {
    id: uniqid(),
    qp: [pm, given],
    ap: [a, b],
    validate: [`${a},${b}`],
    hint: {
      rules: ['依序填入 a,b', '以逗號或空白分隔'],
      example: '3,10',
    },
  };
};

const question = (pm: number, given: number) => {
  switch (pm) {
    case 1:
      return `若 \\(x+\\dfrac1x=${given}\\)，則 \\(x^2+\\dfrac1{x^2}=a\\)，\\(x^3+\\dfrac1{x^3}=b\\)`;
    case -1:
      return `若 \\(x-\\dfrac1x=${given}\\)，則 \\(x^2+\\dfrac1{x^2}=a\\)，\\(x^3-\\dfrac1{x^3}=b\\)`;
  }

  return '';
};

const answer = (a: number, b: number) => `\\(a=${a},b=${b}\\)`;

export default { values, question, answer };
