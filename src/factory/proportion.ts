import uniqid from 'uniqid';
import { QuestionValues } from 'src/model/Common';
import { fraction, randomInt, randomIntExcept } from 'src/util/math';
import { fractionText } from 'src/util/text';

/**
 * level 0: x:a=b:c
 * level 1: (p/q)x:a=b:c
 * level 2: (mx+n):a=b:c
 * level 3: (mx+n):a=(px+q):c
 */
const values = (level = 0): QuestionValues => {
  const id = uniqid();
  let a = 0;
  let b = 0;
  let c = 0;
  let x = {
    denominator: 1,
    numerator: 1,
  };

  switch (level) {
    default:
      b = randomIntExcept(-15, 15, [0]);
      c = randomIntExcept(-15, 15, [0, b]);
      a = randomIntExcept(-15, 15, [0]);
      x = fraction(c, a * b);
      break;
  }

  // position of unknown value: 1: upper-left, 2: bottom-left, 3: upper-right, 4: bottom-right
  const mode = randomInt(1, 4);

  const fractionResult = fractionText(x.denominator, x.numerator);

  return {
    id,
    qp: [mode, a, b, c],
    ap: [fractionResult.latex],
    validate: [fractionResult.text],
    hint: {
      rules: ['若答案為分數請寫用 / 表示', '若為負數，請將負號寫在最前面'],
      example: '-2/3',
    },
  };
};

const question = (
  mode: number | string,
  a: number | string,
  b: number | string,
  c: number | string,
) => {
  if (typeof a === 'string') a = Number(a);
  if (typeof b === 'string') b = Number(b);
  if (typeof c === 'string') c = Number(c);

  const textA = a > 0 ? `${a}` : `(${a})`;
  const textB = b > 0 ? `${b}` : `(${b})`;
  const textC = c > 0 ? `${c}` : `(${c})`;
  if (mode === 1) return `\\(x:${textA}=${textB}:${textC}\\)`;
  if (mode === 2) return `\\(${textA}:x=${textC}:${textB}\\)`;
  if (mode === 3) return `\\(${textB}:${textC}=x:${textA}\\)`;
  else return `\\(${textC}:${textB}=${textA}:x\\)`;
};

const answer = (result: number | string) => `\\(${result}\\)`;

export default { values, question, answer };
