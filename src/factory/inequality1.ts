import Fraction from 'fraction.js';
import uniqid from 'uniqid';
import { QuestionValues } from 'src/model/Common';
import { randomInt, randomIntExcept } from 'src/util/math';
import { MyFraction } from 'src/util/MyFraction';
import { polynomial } from 'src/util/text';

const signLatex = ['>', '\\ge', '<', '\\le', '>', '\\ge'];
const signText = ['>', '>=', '<', '<=', '>', '>='];

const values = (level?: number): QuestionValues => {
  const h = 1;
  let a = 1;
  const b = randomIntExcept(-15, 15, [0]);
  const d = randomInt(-15, 15);
  const signIdx = randomInt(0, 3);
  let ans = new Fraction(0);

  switch (level) {
    case 1:
      a = randomIntExcept(-9, 9, [0]);
      ans = new MyFraction(d - b, a);
      break;
    default:
      ans = new Fraction(d - b);
      break;
  }

  return {
    id: uniqid(),
    qp: [h, a, b, d, signIdx],
    ap: [ans.toLatex(), a > 0 ? signIdx : signIdx + 2],
    validate: [`x${signText[a > 0 ? signIdx : signIdx + 2]}${ans.toFraction()}`],
  };
};

const question = (
  h: number | string,
  a: number | string,
  b: number | string,
  d: number | string,
  signIdx: number | string,
) => {
  if (h === 1) return `\\(${polynomial('x', a, b)}${signLatex[Number(signIdx)]}${d}\\)`;
  else
    return `\\(${polynomial(`(${polynomial('x', a, b)})`, h, 0)}${
      signLatex[Number(signIdx)]
    }${d}\\)`;
};

const answer = (ans: number | string, signIdx: number | string) =>
  `\\(x${signLatex[Number(signIdx)]}${ans}\\)`;

export default { values, question, answer };
