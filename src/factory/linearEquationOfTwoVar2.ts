import uniqid from 'uniqid';
import { QuestionValues } from 'src/model/Common';
import { randomInt, randomIntExcept } from 'src/util/math';

const values = (level?: number): QuestionValues => {
  const order = randomInt(0, 1);

  const mode = randomInt(0, 1); // 0 for vertical, 1 for horizontal
  const x1 = randomInt(-10, 10);
  const y1 = randomInt(-10, 10);
  const x2 = mode ? randomIntExcept(-10, 10, [x1]) : x1;
  const y2 = mode ? y1 : randomIntExcept(-10, 10, [y1]);

  let ans = '';
  const validate: string[] = [];
  switch (level) {
    default:
      ans = mode ? `y=${y1}` : `x=${x1}`;
      validate.push(ans);
      validate.push(mode ? `-y=${-y1}` : `-x=${-x1}`);
      break;
  }

  return {
    id: uniqid(),
    qp: [order, x1, x2, y1, y2],
    ap: [ans],
    validate,
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
