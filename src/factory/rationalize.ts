import uniqid from 'uniqid';
import { QuestionValues } from 'src/model/Common';
import { randomInt, rationalizeSingle } from 'src/util/math';
import { coefficient } from 'src/util/text';

const values = (): QuestionValues => {
  let denominator = 1;
  let numerator = 1;
  let a = { numeratorCoefficient: 1, numeratorRadical: 1, denominator: 1 };

  // 1: sqrt{a}/sqrt{b}, 2: sqrt{a/b}, 3: a/sqrt{b}
  const type = randomInt(1, 3);
  switch (type) {
    case 1:
      while (a.numeratorRadical === 1 || a.denominator === 1) {
        denominator = randomInt(2, 20);
        numerator = randomInt(1, 20);
        a = rationalizeSingle(denominator, numerator);
      }
      break;
    case 2:
      while (a.numeratorRadical === 1 || a.denominator === 1) {
        denominator = randomInt(2, 20);
        numerator = randomInt(1, 20);
        a = rationalizeSingle(denominator, numerator);
      }
      break;
    case 3:
      while (a.numeratorRadical === 1 || a.denominator === 1) {
        denominator = randomInt(2, 20);
        numerator = randomInt(1, 20);
        a = rationalizeSingle(denominator, numerator * numerator);
      }
      break;
  }

  return {
    id: uniqid(),
    qp: [type, numerator, denominator],
    ap: [a.numeratorCoefficient, a.numeratorRadical, a.denominator],
    validate: [[a.numeratorCoefficient, a.numeratorRadical, a.denominator].join()],
    hint: {
      rules: ['依序填入 a,b,c', '化至最簡', '以逗號或空白分隔'],
      example: '1,2,5',
    },
  };
};

const question = (
  type: number | string,
  numerator: number | string,
  denominator: number | string,
) => {
  switch (type) {
    case 1:
      return `化簡 \\(\\dfrac{\\sqrt{${numerator}}}{\\sqrt{${denominator}}}=\\dfrac{a\\sqrt b}{c}\\)`;
    case 2:
      return `化簡 \\(\\sqrt{\\dfrac{${numerator}}{${denominator}}}=\\dfrac{a\\sqrt b}{c}\\)`;
    case 3:
      return `化簡 \\(\\dfrac{${numerator}}{\\sqrt{${denominator}}}=\\dfrac{a\\sqrt b}{c}\\)`;
  }

  return '';
};

const answer = (
  numeratorCoefficient: number | string,
  numeratorRadical: number | string,
  denominator: number | string,
) => {
  if (typeof numeratorCoefficient === 'string') numeratorCoefficient = Number(numeratorCoefficient);

  const ansNumerator = coefficient(numeratorCoefficient, `\\sqrt{${numeratorRadical}}`, true);
  const ans = denominator === 1 ? ansNumerator : `\\dfrac{${ansNumerator}}{${denominator}}`;

  return `\\(${ans}\\)`;
};

export default { values, question, answer };
