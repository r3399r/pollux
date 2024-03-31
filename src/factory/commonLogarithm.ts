import uniqid from 'uniqid';
import { QuestionValues } from 'src/model/Common';
import { bn } from 'src/util/bignumber';
import {
  fractionText,
  randomElement,
  randomIntBetween,
  randomIntBetweenExcept,
} from 'src/util/math';

const values = (): QuestionValues => {
  let n = 0;
  let b = 0;
  let v = '';

  // 1 for log 100, 2 for log 1/100, 3 for log 10^{12}, 4 for log\sqrt[3]{100}
  const type = randomElement([1, 2, 3, 4, 4, 4]) as 1 | 2 | 3 | 4;
  switch (type) {
    case 1:
      n = randomIntBetween(0, 5);
      v = n.toString();
      break;
    case 2:
      n = randomIntBetween(1, 5);
      v = (-n).toString();
      break;
    case 3:
      n = randomIntBetweenExcept(-15, 15, [0, 1]);
      v = n.toString();
      break;
    case 4:
      n = randomIntBetweenExcept(-5, 5, [0]);
      b = randomIntBetween(2, 5);
      v = fractionText(b, n).text;
      break;
  }

  return {
    id: uniqid(),
    qp: [type, n, b],
    ap: [type, n, b],
    validate: [v],
    hint: {
      rules: ['若答案為分數請寫用 / 表示', '若為負數，請將負號寫在最前面'],
      example: '-2/3',
    },
  };
};

const question = (type: number, n: number, b: number) => {
  switch (type) {
    case 1:
      return `\\(\\log${bn(10).pow(n).toFixed()}=?\\)`;
    case 2:
      return `\\(\\log\\dfrac1{${bn(10).pow(n).toFixed()}}=?\\)`;
    case 3:
      return `\\(\\log10^{${n}}=?\\)`;
    case 4:
      return `\\(\\log\\sqrt${b > 2 ? `[${b}]` : ''}{${
        n > 0 ? `${bn(10).pow(n).toFixed()}` : `\\dfrac1{${bn(10).pow(-n).toFixed()}}`
      }}=?\\)`;
  }

  return '';
};

const answer = (type: number, n: number, b: number) => {
  switch (type) {
    case 1:
      return `\\(${n.toString()}\\)`;
    case 2:
      return `\\(${(-n).toString()}\\)`;
    case 3:
      return `\\(${n.toString()}\\)`;
    case 4:
      return `\\(${fractionText(b, n).latex}\\)`;
  }

  return '';
};

export default { values, question, answer };
