import uniqid from 'uniqid';
import { QuestionValues } from 'src/model/Common';
import { randomInt, randomIntExcept } from 'src/util/math';
import { polynomial } from 'src/util/text';

const values = (level?: number): QuestionValues => {
  const order = randomInt(0, 1);

  let mode = 0;
  let x1 = 0;
  let x2 = 0;
  let y1 = 0;
  let y2 = 0;
  let a = 0;
  let b = 0;
  let ans = '';

  switch (level) {
    case 1:
      x1 = randomInt(-6, 6);
      x2 = randomIntExcept(-6, 6, [x1]);
      a = randomIntExcept(-9, 9, [0]);
      b = randomInt(-9, 9);
      y1 = a * x1 + b;
      y2 = a * x2 + b;
      ans = `y=${polynomial('x', a, b)}`;
      break;
    default:
      mode = randomInt(0, 1); // 0 for vertical, 1 for horizontal
      x1 = randomInt(-10, 10);
      y1 = randomInt(-10, 10);
      x2 = mode ? randomIntExcept(-10, 10, [x1]) : x1;
      y2 = mode ? y1 : randomIntExcept(-10, 10, [y1]);
      ans = mode ? `y=${y1}` : `x=${x1}`;
      break;
  }

  return {
    id: uniqid(),
    qp: [order, x1, x2, y1, y2],
    ap: [ans],
    validate: [ans],
  };
};

const question = (
  order: number | string,
  x1: number | string,
  x2: number | string,
  y1: number | string,
  y2: number | string,
) =>
  order
    ? `若直線 \\(L\\) 通過 \\(A(${x1},${y1})\\) 和 \\(B(${x2},${y2})\\)，則 \\(L\\) 的直線方程式為何?`
    : `若點 \\(A(${x1},${y1})\\) 和 \\(B(${x2},${y2})\\) 在直線 \\(L\\) 上，則 \\(L\\) 的直線方程式為何?`;

const answer = (m: number | string) => `\\(${m}\\)`;

export default { values, question, answer };
