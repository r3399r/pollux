import uniqid from 'uniqid';
import { QuestionValues } from 'src/model/Common';
import { randomIntBetween } from 'src/util/math';

const values = (level = 0): QuestionValues => {
  let tensDigitA = 0;
  let unitsDigitA = 0;
  let tensDigitB = 0;
  let unitsDigitB = 0;

  switch (level) {
    case 3:
      tensDigitA = randomIntBetween(1, 7);
      unitsDigitA = randomIntBetween(1, 9);
      tensDigitB = randomIntBetween(1, 8 - tensDigitA);
      unitsDigitB = randomIntBetween(10 - unitsDigitA, 9);
      break;
    case 2:
      tensDigitA = randomIntBetween(1, 8);
      unitsDigitA = randomIntBetween(0, 8);
      tensDigitB = randomIntBetween(1, 9 - tensDigitA);
      unitsDigitB = randomIntBetween(0, 9 - unitsDigitA);
      break;
    case 1:
      tensDigitA = randomIntBetween(1, 8);
      unitsDigitA = randomIntBetween(1, 9);
      unitsDigitB = randomIntBetween(10 - unitsDigitA, 9);
      break;
    default:
      tensDigitA = randomIntBetween(1, 9);
      unitsDigitA = randomIntBetween(0, 8);
      unitsDigitB = randomIntBetween(1, 9 - unitsDigitA);
      break;
  }

  const a = tensDigitA * 10 + unitsDigitA;
  const b = tensDigitB * 10 + unitsDigitB;
  const c = a + b;

  return { id: uniqid(), qp: [a, b], ap: [c], validate: [`${c}`] };
};

const question = (a: number, b: number) => `\\(${a}+${b}=?\\)`;

const answer = (c: number) => `${c}`;

export default { values, question, answer };
