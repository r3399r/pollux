import uniqid from 'uniqid';
import { QuestionValues } from 'src/model/Common';
import { randomInt } from 'src/util/math';

const values = (): QuestionValues => {
  const r = randomInt(1, 10);
  const theta = randomInt(1, 6);
  const l = r * theta;

  let v = '';

  // 1: r unknown, 2: theta unknown, 3: l unknown
  const type = randomInt(1, 3);
  switch (type) {
    case 1:
      v = r.toString();
      break;
    case 2:
      v = theta.toString();
      break;
    case 3:
      v = l.toString();
      break;
  }

  return { id: uniqid(), qp: [type, theta, l, r], ap: [type, theta, l, r], validate: [v] };
};

const question = (
  type: number | string,
  theta: number | string,
  l: number | string,
  r: number | string,
) => {
  switch (type) {
    case 1:
      return `一扇形，其圓心角弧度 ${theta}，弧長 ${l}，求半徑`;
    case 2:
      return `一扇形，半徑 ${r}，弧長 ${l}，求圓心角弧度`;
    case 3:
      return `一扇形，半徑 ${r}，圓心角弧度 ${theta}，求弧長`;
  }

  return '';
};

const answer = (
  type: number | string,
  theta: number | string,
  l: number | string,
  r: number | string,
) => {
  switch (type) {
    case 1:
      return r.toString();
    case 2:
      return theta.toString();
    case 3:
      return l.toString();
  }

  return '';
};

export default { values, question, answer };
