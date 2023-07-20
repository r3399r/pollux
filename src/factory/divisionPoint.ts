import uniqid from 'uniqid';
import { Question } from 'src/model/Common';
import {
  gcd as findGcd,
  fraction,
  randomElement,
  randomElementExcept,
  randomIntBetween,
} from 'src/util/math';

const divisionPoint = (): Question => {
  const a = randomIntBetween(-10, 10);
  const b = randomElementExcept(
    [-10, -9, -8, -7, -6, -5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    a,
  );

  const type = randomElement([1, 2]) as 1 | 2;
  let ans = { denominator: 0, numerator: 0 };
  let q = '';
  let d = 0;
  const m = randomIntBetween(1, 10);
  let n = 0;
  switch (type) {
    case 1:
      n = randomIntBetween(1, 10);
      d = findGcd(m, n);
      q = `數線上兩點 \\(A(${a})\\) 與 \\(B(${b})\\)，點 \\(P\\) 滿足 \\(\\overline{PA}:\\overline{PB}=${
        m / d
      }:${n / d}\\)，若 \\(P\\) 在線段 \\(\\overline{AB}\\) 上，求 \\(P\\) 點坐標。`;
      ans = fraction(m + n, a * n + b * m);
      break;
    case 2:
      n = randomElementExcept([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], m);
      d = findGcd(m, n);
      q = `數線上兩點 \\(A(${a})\\) 與 \\(B(${b})\\)，點 \\(P\\) 滿足 \\(\\overline{PA}:\\overline{PB}=${
        m / d
      }:${n / d}\\)，若 \\(P\\) 在線段 \\(\\overline{AB}\\) 外，求 \\(P\\) 點坐標。`;
      ans = m > n ? fraction(m - n, b * m - a * n) : fraction(n - m, a * n - b * m);
      break;
  }

  const { denominator, numerator } = ans;

  return {
    id: uniqid(),
    q,
    a: denominator === 1 ? `\\(${numerator}\\)` : `\\(\\dfrac{${numerator}}{${denominator}}\\)`,
    validate: [denominator === 1 ? numerator.toString() : `${numerator}/${denominator}`],
    hint: {
      rules: ['若答案為分數請寫用 / 表示', '若為負數，請將負號寫在最前面'],
      example: '-2/3',
    },
  };
};

export default divisionPoint;
