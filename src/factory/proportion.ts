import uniqid from 'uniqid';
import { QuestionValues } from 'src/model/Common';
import { gcd, randomInt, randomIntExcept } from 'src/util/math';

/**
 * level 0: x:a=b:c
 * level 1: (p/q)x:a=b:c
 * level 2: (mx+n):a=b:c
 * level 3: (mx+n):a=(px+q):c
 */
const values = (level = 0): QuestionValues => {
  const x = randomInt(1, 20);
  const a = randomIntExcept(1, 20, [x]);
  const d = gcd(x, a);

  const t = randomIntExcept(1, 5, [d]);
  const b = (x / d) * t;
  const c = (a / d) * t;

  // position of unknown value: 1: upper-left, 2: bottom-left, 3: upper-right, 4: bottom-right
  const mode = randomInt(1, 4);

  return {
    id: uniqid(),
    qp: [mode, a, b, c],
    ap: [x],
    validate: [`${x}`],
  };
};

const question = (mode: number, a: number, b: number, c: number) => {
  if (mode === 1) return `\\(x:${a}=${b}:${c}\\)`;
  if (mode === 2) return `\\(${a}:x=${c}:${b}\\)`;
  if (mode === 3) return `\\(${b}:${c}=x:${a}\\)`;
  else return `\\(${c}:${b}=${a}:x\\)`;
};

const answer = (x: number) => `${x}`;

export default { values, question, answer };
