import uniqid from 'uniqid';
import { Question } from 'src/model/Common';
import { randomIntBetween } from 'src/util/math';

const add100 = (level = 0): Question => {
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

  return { id: uniqid(), q: `\\(${a}+${b}=?\\)`, a: `${c}`, validate: [`${c}`] };
};

export default add100;
