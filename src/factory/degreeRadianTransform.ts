import uniqid from 'uniqid';
import { Question } from 'src/model/Common';
import { fractionText, randomElement, randomIntBetween } from 'src/util/math';

const degreeRadianTransform = (): Question => {
  let q = '';
  let a = '';
  let v: string[] = [];
  let n = '';
  let d = '';
  const prime = randomElement([2, 3, 5]);
  let degree = 0;
  if (prime === 2) degree = 2 * randomIntBetween(1, 179);
  else if (prime === 3) degree = 3 * randomIntBetween(1, 59);
  else if (prime === 5) degree = 5 * randomIntBetween(1, 35);
  const radian = fractionText(180, degree);

  // 1: degree to radian, 2: radian to degree
  const type = randomIntBetween(1, 2);
  switch (type) {
    case 1:
      q = `將角度換算成弧度：\\(${degree}\\du\\)`;
      a = `\\(${radian.latex}\\pi\\)`;
      n = radian.text.split('/')[0];
      d = radian.text.split('/')[1];
      if (n === '1') v = [`π/${d}`];
      else v = [`${n}π/${d}`];
      break;
    case 2:
      q = `將弧度換算成角度：\\(${radian.latex}\\pi\\)`;
      a = `\\(${degree}\\du\\)`;
      v = [`${degree}°`];
      break;
  }

  return {
    id: uniqid(),
    q,
    a,
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

export default degreeRadianTransform;
