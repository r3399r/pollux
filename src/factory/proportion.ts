import uniqid from 'uniqid';
import { QuestionValues } from 'src/model/Common';
import { gcd, randomFraction, randomInt, randomIntExcept } from 'src/util/math';
import { MyFraction } from 'src/util/MyFraction';
import { polynomial } from 'src/util/text';

/**
 * level 0: x:a=b:c
 * level 1: mx:a=b:c, m is fraction
 * level 2: (mx+n):a=b:c, all variables are integer
 * level 3: (mx+n):a=(kx+t):c, all variables are integer
 */
const values = (level = 0): QuestionValues => {
  const id = uniqid();
  const mode = randomInt(1, 4);
  let m = '1';
  let n = 0;
  let k = '0';
  let t = 0;
  let x = new MyFraction(0);

  const b = randomIntExcept(-15, 15, [0]);
  const c = randomIntExcept(-15, 15, [0, b]);
  let a = randomIntExcept(-15, 15, [0, c]);

  const d = gcd(b, c);
  const mul = randomIntExcept(-5, 5, [0, d]);
  const y = (b / d) * mul;

  switch (level) {
    case 3:
      k = randomIntExcept(-5, 5, [0]).toString();
      x = new MyFraction(randomIntExcept(-9, 9, [0]));
      t = b - Number(k) * x.valueOf();

      a = (c / d) * mul;
      m = randomIntExcept(-5, 5, [0]).toString();
      n = y - Number(m) * x.valueOf();
      break;
    case 2:
      a = (c / d) * mul;
      m = randomIntExcept(-5, 5, [0]).toString();
      x = new MyFraction(randomIntExcept(-9, 9, [0]));
      n = y - Number(m) * x.valueOf();
      break;
    case 1:
      m = randomFraction(-5, 5, 2, 5);
      x = new MyFraction(a * b, c).div(m);
      break;
    default:
      x = new MyFraction(a * b, c);
      break;
  }

  return {
    id,
    qp: [mode, m, n, a, k, level === 3 ? t : b, c],
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
  m: number | string,
  n: number | string,
  a: number | string,
  k: number | string,
  t: number | string,
  c: number | string,
) => {
  if (typeof a === 'string') a = Number(a);
  if (typeof c === 'string') c = Number(c);
  if (typeof m === 'number') m = String(m);
  if (typeof n === 'string') n = Number(m);
  if (typeof k === 'number') k = String(k);
  if (typeof t === 'string') t = Number(t);

  const poly1 = polynomial('x', m, n);
  const n1 =
    m.includes('-') || (m !== '0' && n !== 0) || (m === '0' && n < 0) ? `(${poly1})` : poly1;
  const n2 = a > 0 ? `${a}` : `(${a})`;

  const poly2 = polynomial('x', k, t);
  const m1 =
    k.includes('-') || (k !== '0' && t !== 0) || (k === '0' && t < 0) ? `(${poly2})` : poly2;
  const m2 = c > 0 ? `${c}` : `(${c})`;

  if (mode === 1) return `\\(${n1}:${n2}=${m1}:${m2}\\)`;
  if (mode === 2) return `\\(${n2}:${n1}=${m2}:${m1}\\)`;
  if (mode === 3) return `\\(${m1}:${m2}=${n1}:${n2}\\)`;

  return `\\(${m2}:${m1}=${n2}:${n1}\\)`;
};

const answer = (result: number | string) => `\\(${result}\\)`;

export default { values, question, answer };
