import uniqid from 'uniqid';
import { QuestionValues } from 'src/model/Common';
import { gcd as findGcd, pickRandomElement, randomInt, randomIntExcept } from 'src/util/math';
import { MyFraction } from 'src/util/MyFraction';

const values = (): QuestionValues => {
  const a = randomInt(-10, 10);
  const b = randomIntExcept(-10, 10, [a]);

  const type = pickRandomElement([1, 2]) as 1 | 2;
  let ans = new MyFraction(0);
  let d = 0;
  const m = randomInt(1, 10);
  let n = 0;
  switch (type) {
    case 1:
      n = randomInt(1, 10);
      d = findGcd(m, n);
      ans = new MyFraction(a * n + b * m, m + n);
      break;
    case 2:
      n = randomIntExcept(1, 10, [m]);
      d = findGcd(m, n);
      ans = m > n ? new MyFraction(b * m - a * n, m - n) : new MyFraction(a * n - b * m, n - m);
      break;
  }

  return {
    id: uniqid(),
    qp: [type, a, b, m, n, d],
    ap: [type, a, b, m, n],
    validate: [ans.toFraction()],
  };
};

const question = (
  type: number | string,
  a: number | string,
  b: number | string,
  m: number | string,
  n: number | string,
  d: number | string,
) => {
  if (typeof m === 'string') m = Number(m);
  if (typeof n === 'string') n = Number(n);
  if (typeof d === 'string') d = Number(d);

  switch (type) {
    case 1:
      return `數線上兩點 \\(A(${a})\\) 與 \\(B(${b})\\)，點 \\(P\\) 滿足 \\(\\overline{PA}:\\overline{PB}=${
        m / d
      }:${n / d}\\)，若 \\(P\\) 在線段 \\(\\overline{AB}\\) 上，求 \\(P\\) 點坐標。`;
    case 2:
      return `數線上兩點 \\(A(${a})\\) 與 \\(B(${b})\\)，點 \\(P\\) 滿足 \\(\\overline{PA}:\\overline{PB}=${
        m / d
      }:${n / d}\\)，若 \\(P\\) 在線段 \\(\\overline{AB}\\) 外，求 \\(P\\) 點坐標。`;
  }

  return '';
};

const answer = (
  type: number | string,
  a: number | string,
  b: number | string,
  m: number | string,
  n: number | string,
) => {
  if (typeof m === 'string') m = Number(m);
  if (typeof n === 'string') n = Number(n);
  if (typeof a === 'string') a = Number(a);
  if (typeof b === 'string') b = Number(b);

  let ans = new MyFraction(0);
  switch (type) {
    case 1:
      ans = new MyFraction(a * n + b * m, m + n);
      break;
    case 2:
      ans = m > n ? new MyFraction(b * m - a * n, m - n) : new MyFraction(a * n - b * m, n - m);
      break;
  }

  return `\\(${ans.toLatex()}\\)`;
};

export default { values, question, answer };
