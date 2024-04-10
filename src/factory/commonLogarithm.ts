import uniqid from 'uniqid';
import { QuestionValues } from 'src/model/Common';
import { bn } from 'src/util/bignumber';
import { pickRandomElement, randomInt, randomIntExcept } from 'src/util/math';
import { MyFraction } from 'src/util/MyFraction';

const values = (): QuestionValues => {
  let n = 0;
  let b = 0;
  let v = '';

  // 1 for log 100, 2 for log 1/100, 3 for log 10^{12}, 4 for log\sqrt[3]{100}
  const type = pickRandomElement([1, 2, 3, 4, 4, 4]) as 1 | 2 | 3 | 4;
  switch (type) {
    case 1:
      n = randomInt(0, 5);
      v = n.toString();
      break;
    case 2:
      n = randomInt(1, 5);
      v = (-n).toString();
      break;
    case 3:
      n = randomIntExcept(-15, 15, [0, 1]);
      v = n.toString();
      break;
    case 4:
      n = randomIntExcept(-5, 5, [0]);
      b = randomInt(2, 5);
      v = new MyFraction(n, b).toFraction();
      break;
  }

  return {
    id: uniqid(),
    qp: [type, n, b],
    ap: [type, n, b],
    validate: [v],
    hint: {
      rules: ['若答案為分數請用 / 表示', '若為負數，請將負號寫在最前面'],
      example: '-2/3',
    },
  };
};

const question = (type: number | string, n: number | string, b: number | string) => {
  if (typeof b === 'string') b = Number(b);
  if (typeof n === 'string') n = Number(n);

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

const answer = (type: number | string, n: number | string, b: number | string) => {
  if (typeof b === 'string') b = Number(b);
  if (typeof n === 'string') n = Number(n);

  switch (type) {
    case 1:
      return `\\(${n.toString()}\\)`;
    case 2:
      return `\\(${(-n).toString()}\\)`;
    case 3:
      return `\\(${n.toString()}\\)`;
    case 4:
      return `\\(${new MyFraction(n, b).toLatex()}\\)`;
  }

  return '';
};

export default { values, question, answer };
