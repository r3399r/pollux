import uniqid from 'uniqid';
import { QuestionValues } from 'src/model/Common';
import { randomInt } from 'src/util/math';

const values = (level = 0): QuestionValues => {
  let tensDigitA = 0;
  let unitsDigitA = 0;
  let tensDigitB = 0;
  let unitsDigitB = 0;

  switch (level) {
    case 3:
      tensDigitA = randomInt(1, 7);
      unitsDigitA = randomInt(1, 9);
      tensDigitB = randomInt(1, 8 - tensDigitA);
      unitsDigitB = randomInt(10 - unitsDigitA, 9);
      break;
    case 2:
      tensDigitA = randomInt(1, 8);
      unitsDigitA = randomInt(0, 8);
      tensDigitB = randomInt(1, 9 - tensDigitA);
      unitsDigitB = randomInt(0, 9 - unitsDigitA);
      break;
    case 1:
      tensDigitA = randomInt(1, 8);
      unitsDigitA = randomInt(1, 9);
      unitsDigitB = randomInt(10 - unitsDigitA, 9);
      break;
    default:
      tensDigitA = randomInt(1, 9);
      unitsDigitA = randomInt(0, 8);
      unitsDigitB = randomInt(1, 9 - unitsDigitA);
      break;
  }

  const a = tensDigitA * 10 + unitsDigitA;
  const b = tensDigitB * 10 + unitsDigitB;
  const c = a + b;

  return { id: uniqid(), qp: [a, b], ap: [c], validate: [`${c}`] };
};

const question = (a: number | string, b: number | string) => `\\(${a}+${b}=?\\)`;

const answer = (c: number | string) => `${c}`;

export default { values, question, answer };
