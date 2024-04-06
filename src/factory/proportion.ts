import Fraction from 'fraction.js';
import uniqid from 'uniqid';
import { QuestionValues } from 'src/model/Common';
import { randomFraction, randomInt, randomIntExcept } from 'src/util/math';
import { polynomial } from 'src/util/text';

/**
 * level 0: x:a=b:c
 * level 1: px:a=b:c, p is fraction
 * level 2: (mx+n):a=b:c
 * level 3: (mx+n):a=(px+q):c
 */
const values = (level = 0): QuestionValues => {
  const id = uniqid();
  const mode = randomInt(1, 4);
  let a = 0;
  let b = 0;
  let c = 0;
  let p = '1';
  let x = new Fraction(0);

  b = randomIntExcept(-15, 15, [0]);
  c = randomIntExcept(-15, 15, [0, b]);
  a = randomIntExcept(-15, 15, [0, c]);

  switch (level) {
    case 1:
      p = randomFraction(-5, 5, 2, 10);
      x = new Fraction(a * b, c).div(p);
      break;
    default:
      x = new Fraction(a * b, c);
      break;
  }

  return {
    id,
    qp: [mode, p, a, b, c],
    ap: [x.toLatex()],
    validate: [x.toFraction()],
    hint: {
      rules: ['若答案為分數請寫用 / 表示', '若為負數，請將負號寫在最前面'],
      example: '-2/3',
    },
  };
};

const question = (
  mode: number | string,
  p: number | string,
  a: number | string,
  b: number | string,
  c: number | string,
) => {
  if (typeof a === 'string') a = Number(a);
  if (typeof b === 'string') b = Number(b);
  if (typeof c === 'string') c = Number(c);
  if (typeof p === 'number') p = String(p);

  const poly = polynomial('x', p, 0);
  const n1 = p.includes('-') ? `(${poly})` : poly;
  const n2 = a > 0 ? `${a}` : `(${a})`;
  const m1 = b > 0 ? `${b}` : `(${b})`;
  const m2 = c > 0 ? `${c}` : `(${c})`;

  if (mode === 1) return `\\(${n1}:${n2}=${m1}:${m2}\\)`;
  if (mode === 2) return `\\(${n2}:${n1}=${m2}:${m1}\\)`;
  if (mode === 3) return `\\(${m1}:${m2}=${n1}:${n2}\\)`;

  return `\\(${m2}:${m1}=${n2}:${n1}\\)`;
};

const answer = (result: number | string) => `\\(${result}\\)`;

export default { values, question, answer };
