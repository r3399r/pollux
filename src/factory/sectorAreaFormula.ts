import uniqid from 'uniqid';
import { QuestionValues } from 'src/model/Common';
import { randomInt } from 'src/util/math';

const values = (): QuestionValues => {
  const r = randomInt(1, 10);
  const theta = randomInt(1, 6);
  const area = (r * r * theta) / 2;

  let v = '';

  // 1: r unknown, 2: theta unknown, 3: area unknown
  const type = randomInt(1, 3);
  switch (type) {
    case 1:
      v = r.toString();
      break;
    case 2:
      v = theta.toString();
      break;
    case 3:
      v = area.toString();
      break;
  }

  return { id: uniqid(), qp: [type, theta, area, r], ap: [type, theta, area, r], validate: [v] };
};

const question = (type: number, theta: number, area: number, r: number) => {
  switch (type) {
    case 1:
      return `一扇形，其圓心角弧度 ${theta}，面積 ${area}，求半徑`;
    case 2:
      return `一扇形，半徑 ${r}，面積 ${area}，求圓心角弧度`;
    case 3:
      return `一扇形，半徑 ${r}，圓心角弧度 ${theta}，求面積`;
  }

  return '';
};

const answer = (type: number, theta: number, area: number, r: number) => {
  switch (type) {
    case 1:
      return r.toString();
    case 2:
      return theta.toString();
    case 3:
      return area.toString();
  }

  return '';
};

export default { values, question, answer };
