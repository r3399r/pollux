import uniqid from 'uniqid';
import { Question } from 'src/model/Common';
import { bn } from 'src/util/bignumber';
import {
  fractionText,
  randomElement,
  randomIntBetween,
  randomIntBetweenExcept,
} from 'src/util/math';

const commonLogarithm = (): Question => {
  let n = 0;
  let a = '';
  let b = 0;
  let q = '';
  let v = '';
  // 1 for log 100, 2 for log 1/100, 3 for log 10^{12}, 4 for log\sqrt[3]{100}
  const type = randomElement([1, 2, 3, 4, 4, 4]) as 1 | 2 | 3 | 4;
  switch (type) {
    case 1:
      n = randomIntBetween(0, 5);
      q = `\\(\\log${bn(10).pow(n).toFixed()}=?\\)`;
      a = n.toString();
      v = n.toString();
      break;
    case 2:
      n = randomIntBetween(1, 5);
      q = `\\(\\log\\dfrac1{${bn(10).pow(n).toFixed()}}=?\\)`;
      a = (-n).toString();
      v = (-n).toString();
      break;
    case 3:
      n = randomIntBetweenExcept(-15, 15, [0, 1]);
      q = `\\(\\log10^{${n}}=?\\)`;
      a = n.toString();
      v = n.toString();
      break;
    case 4:
      n = randomIntBetweenExcept(-5, 5, [0]);
      b = randomIntBetween(2, 5);
      q = `\\(\\log\\sqrt${b > 2 ? `[${b}]` : ''}{${
        n > 0 ? `${bn(10).pow(n).toFixed()}` : `\\dfrac1{${bn(10).pow(-n).toFixed()}}`
      }}=?\\)`;
      a = fractionText(b, n).latex;
      v = fractionText(b, n).text;
      break;
  }

  return {
    id: uniqid(),
    q,
    a: `\\(${a}\\)`,
    validate: [v],
    hint: {
      rules: ['若答案為分數請寫用 / 表示', '若為負數，請將負號寫在最前面'],
      example: '-2/3',
    },
  };
};

export default commonLogarithm;
