import uniqid from 'uniqid';
import { Question } from 'src/model/Common';
import { coefficient, randomIntBetween, rationalizeSingle } from 'src/util/math';

const rationalize = (): Question => {
  let denominator = 1;
  let numerator = 1;
  let a = { numeratorCoefficient: 1, numeratorRadical: 1, denominator: 1 };
  let q = '';

  // 1: sqrt{a}/sqrt{b}, 2: sqrt{a/b}, 3: a/sqrt{b}
  const type = randomIntBetween(1, 3);
  switch (type) {
    case 1:
      while (a.numeratorRadical === 1 || a.denominator === 1) {
        denominator = randomIntBetween(2, 20);
        numerator = randomIntBetween(1, 20);
        a = rationalizeSingle(denominator, numerator);
      }
      q = `化簡 \\(\\dfrac{\\sqrt{${numerator}}}{\\sqrt{${denominator}}}=\\dfrac{a\\sqrt b}{c}\\)`;
      break;
    case 2:
      while (a.numeratorRadical === 1 || a.denominator === 1) {
        denominator = randomIntBetween(2, 20);
        numerator = randomIntBetween(1, 20);
        a = rationalizeSingle(denominator, numerator);
      }
      q = `化簡 \\(\\sqrt{\\dfrac{${numerator}}{${denominator}}}=\\dfrac{a\\sqrt b}{c}\\)`;
      break;
    case 3:
      while (a.numeratorRadical === 1 || a.denominator === 1) {
        denominator = randomIntBetween(2, 20);
        numerator = randomIntBetween(1, 20);
        a = rationalizeSingle(denominator, numerator * numerator);
      }
      q = `化簡 \\(\\dfrac{${numerator}}{\\sqrt{${denominator}}}=\\dfrac{a\\sqrt b}{c}\\)`;
      break;
  }

  const ansNumerator = coefficient(a.numeratorCoefficient, `\\sqrt{${a.numeratorRadical}}`, true);
  const ans = a.denominator === 1 ? ansNumerator : `\\dfrac{${ansNumerator}}{${a.denominator}}`;

  return {
    id: uniqid(),
    q,
    a: `\\(${ans}\\)`,
    validate: [[a.numeratorCoefficient, a.numeratorRadical, a.denominator].join()],
    hint: {
      rules: ['依序填入 a,b,c', '化至最簡', '以逗號或空白分隔'],
      example: '1,2,5',
    },
  };
};

export default rationalize;
