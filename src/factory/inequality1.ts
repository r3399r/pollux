import uniqid from 'uniqid';
import { QuestionValues } from 'src/model/Common';
import { randomFraction, randomInt, randomIntExcept } from 'src/util/math';
import { MyFraction } from 'src/util/MyFraction';
import { polynomial } from 'src/util/text';

const signLatex = ['>', '\\ge', '<', '\\le', '>', '\\ge'];
const signText = ['>', '>=', '<', '<=', '>', '>='];

const values = (level?: number): QuestionValues => {
  let h = 1;
  let a = new MyFraction(1);
  const b = randomIntExcept(-15, 15, [0]);
  const d = randomInt(-15, 15);
  const signIdx = randomInt(0, 3);

  switch (level) {
    case 3:
      a = new MyFraction(randomIntExcept(-9, 9, [0]));
      h = randomIntExcept(-9, 9, [0]);
      break;
    case 2:
      a = randomFraction(-5, 5, 2, 9);
      break;
    case 1:
      a = new MyFraction(randomIntExcept(-9, 9, [0]));
      break;
    default:
      break;
  }
  const ans = new MyFraction((d - h * b) * a.d * a.s, h * a.n);

  return {
    id: uniqid(),
    qp: [h, a.toFraction(), b, d, signIdx],
    ap: [ans.toLatex(), h * a.s > 0 ? signIdx : signIdx + 2],
    validate: [`x${signText[h * a.s > 0 ? signIdx : signIdx + 2]}${ans.toFraction()}`],
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
