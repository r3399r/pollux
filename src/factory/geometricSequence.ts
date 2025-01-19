import uniqid from 'uniqid';
import { QuestionValues } from 'src/model/Common';
import { randomBoolean, randomFraction, randomInt, randomIntExcept } from 'src/util/math';
import { MyFraction } from 'src/util/MyFraction';

const values = (): QuestionValues => {
  const term1IsInteger = randomBoolean();
  const term1MinusFactor = randomBoolean() === true ? 1 : -1;
  const term1 = term1IsInteger
    ? new MyFraction(randomIntExcept(-3, 3, [0]), 1)
    : randomFraction(0, 3, 1, 3).mul(term1MinusFactor);

  const commonRatioIsInteger = randomBoolean();
  const commonRatioMinusFactor = randomBoolean() === true ? 1 : -1;

  let commonRatio = new MyFraction(randomIntExcept(-2, 2, [-1, 0, 1]));
  if (!commonRatioIsInteger) {
    const commonRationLessThan1 = randomBoolean();
    commonRatio = commonRationLessThan1
      ? randomFraction(0, 1, 2, 3).mul(commonRatioMinusFactor)
      : randomFraction(1, 2, 2, 2).mul(commonRatioMinusFactor);
  }
  const n1 = randomInt(3, 6);
  const termN1 = commonRatio.pow(n1 - 1).mul(term1);
  const n2 = randomInt(n1 + 1, 9);
  const termN2 = commonRatio.pow(n2 - 1).mul(term1);

  const findWhich = randomBoolean() === true ? 'term1' : 'commonRatio';

  return {
    id: uniqid(),
    qp: [n1, termN1.toLatex(), n2, termN2.toLatex(), findWhich],
    ap: [findWhich === 'term1' ? term1.toLatex() : commonRatio.toLatex()],
    validate: [findWhich === 'term1' ? term1.toFraction() : commonRatio.toFraction()],
  };
};

const question = (
  n1: number | string,
  termN1: number | string,
  n2: number | string,
  termN2: number | string,
  findWhich: number | string,
) =>
  `等比數列的第 ${n1} 項為 \\(${termN1}\\)，第 ${n2} 項為 \\(${termN2}\\)，求${
    findWhich === 'term1' ? '首項' : '公比'
  }`;

const answer = (termTarget: number | string) => `\\(${termTarget.toString()}\\)`;

export default { values, question, answer };
