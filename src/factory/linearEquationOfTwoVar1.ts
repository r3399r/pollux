import uniqid from 'uniqid';
import { QuestionValues } from 'src/model/Common';
import { randomInt, randomIntExcept } from 'src/util/math';
import { coefficient } from 'src/util/text';

const values = (): QuestionValues => {
  const x = randomInt(-10, 10);
  const y = randomInt(-10, 10);
  const a = randomIntExcept(-9, 9, [0]);
  const b = randomIntExcept(-9, 9, [0]);
  const c = a * x + b * y;
  const mode = randomInt(0, 1); // 0:(x,m), 1:(m,y)

  return {
    id: uniqid(),
    qp: [a, b, c, mode, mode ? y : x],
    ap: [mode ? x : y],
    validate: [`${mode ? x : y}`],
  };
};

const question = (
  a: number | string,
  b: number | string,
  c: number | string,
  mode: number | string,
  z: number | string,
) =>
  `若 \\(${coefficient(a, 'x', true)}${coefficient(b, 'y', false)}=${c}\\) 通過點 \\(${
    mode ? `(m,${z})` : `(${z},m)`
  }\\)，求 \\(m\\)`;

const answer = (m: number | string) => `${m}`;

export default { values, question, answer };
