import uniqid from 'uniqid';
import { Question } from 'src/model/Common';
import { randomIntBetween } from 'src/util/math';

const arcLengthFormula = (): Question => {
  const r = randomIntBetween(1, 10);
  const theta = randomIntBetween(1, 6);
  const l = r * theta;

  let q = '';
  let a = '';
  let v = '';

  // 1: r unknown, 2: theta unknown, 3: l unknown
  const type = randomIntBetween(1, 3);
  switch (type) {
    case 1:
      q = `一扇形，其圓心角弧度 ${theta}，弧長 ${l}，求半徑`;
      a = r.toString();
      v = r.toString();
      break;
    case 2:
      q = `一扇形，半徑 ${r}，弧長 ${l}，求圓心角弧度`;
      a = theta.toString();
      v = theta.toString();
      break;
    case 3:
      q = `一扇形，半徑 ${r}，圓心角弧度 ${theta}，求弧長`;
      a = l.toString();
      v = l.toString();
      break;
  }

  return { id: uniqid(), q, a, validate: [v] };
};

export default arcLengthFormula;
