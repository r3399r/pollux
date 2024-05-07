import uniqid from 'uniqid';
import { QuestionValues } from 'src/model/Common';
import { randomInt, randomIntExcept } from 'src/util/math';
import { coefficient } from 'src/util/text';

const values = (level?: number): QuestionValues => {
  const mode = randomInt(0, 1);
  const order = randomInt(0, 1);

  let x = randomInt(-10, 10);
  let y = randomInt(-10, 10);
  const a = randomIntExcept(-9, 9, [0]);
  const b = randomIntExcept(-9, 9, [0]);
  let c = a * x + b * y;

  let equation = '';
  let point = '';
  let ans = 0;
  let unknown = '';
  switch (level) {
    case 1:
      if (x === 0) x = randomIntExcept(-10, 10, [0]);
      if (y === 0) y = randomIntExcept(-10, 10, [0]);
      if (x === 0 || y === 0) c = a * x + b * y;
      equation = mode
        ? `${coefficient(a, 'x', true)}+ky=${c}`
        : `kx${coefficient(b, 'y', false)}=${c}`;
      point = `(${x},${y})`;
      ans = mode ? b : a;
      unknown = 'k';
      break;
    default:
      equation = `${coefficient(a, 'x', true)}${coefficient(b, 'y', false)}=${c}`;
      point = mode ? `(m,${y})` : `(${x},m)`;
      ans = mode ? x : y;
      unknown = 'm';
      break;
  }

  return {
    id: uniqid(),
    qp: [order, equation, point, unknown],
    ap: [ans],
    validate: [`${ans}`],
  };
};

const question = (
  order: number | string,
  equation: number | string,
  point: number | string,
  unknown: number | string,
) =>
  order
    ? `若 \\(${equation}\\) 通過點 \\(${point}\\)，求 \\(${unknown}=?\\)`
    : `若點 \\(${point}\\) 在直線 \\(${equation}\\) 上，求 \\(${unknown}=?\\)`;

const answer = (m: number | string) => `${m}`;

export default { values, question, answer };
