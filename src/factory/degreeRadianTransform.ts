import Fraction from 'fraction.js';
import uniqid from 'uniqid';
import { QuestionValues } from 'src/model/Common';
import { pickRandomElement, randomInt } from 'src/util/math';

const values = (): QuestionValues => {
  let v: string[] = [];
  let n = '';
  let d = '';
  const prime = pickRandomElement([2, 3, 5]);
  let degree = 0;
  if (prime === 2) degree = 2 * randomInt(1, 179);
  else if (prime === 3) degree = 3 * randomInt(1, 59);
  else if (prime === 5) degree = 5 * randomInt(1, 35);
  const radian = new Fraction(degree, 180).toFraction();

  // 1: degree to radian, 2: radian to degree
  const type = randomInt(1, 2);
  switch (type) {
    case 1:
      n = radian.split('/')[0];
      d = radian.split('/')[1];
      if (n === '1') v = [`π/${d}`];
      else v = [`${n}π/${d}`];
      break;
    case 2:
      v = [`${degree}°`];
      break;
  }

  return {
    id: uniqid(),
    qp: [type, degree],
    ap: [type, degree],
    validate: v,
    hint: {
      rules: [
        '特殊符號可在這複製：圓周率「π」，度「°」',
        '分數請化到最簡',
        '答案輸入方式請參考下方',
      ],
      example: '8π/5 或 117°',
    },
  };
};

const question = (type: number | string, degree: number | string) => {
  if (typeof degree === 'string') degree = Number(degree);

  switch (type) {
    case 1:
      return `將角度換算成弧度：\\(${degree}\\du\\)`;
    case 2:
      return `將弧度換算成角度：\\(${new Fraction(degree, 180).toLatex()}\\pi\\)`;
  }

  return '';
};

const answer = (type: number | string, degree: number | string) => {
  if (typeof degree === 'string') degree = Number(degree);

  switch (type) {
    case 1:
      return `\\(${new Fraction(degree, 180).toLatex()}\\pi\\)`;
    case 2:
      return `\\(${degree}\\du\\)`;
  }

  return '';
};

export default { values, question, answer };
