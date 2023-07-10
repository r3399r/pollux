import uniqid from 'uniqid';
import { Question } from 'src/model/Common';
import { randomFloatBetween, randomIntBetween } from 'src/util/math';

const scientificNotation2 = (): Question => {
  const m = randomFloatBetween(1, 9.99, 2);
  const n = randomIntBetween(-10, 10);

  return {
    id: uniqid(),
    q:
      n >= 0
        ? `\\(${m}\\times10^${n}\\) 是幾位數？`
        : `\\(${m}\\times10^{${n}}\\) 從小數點後第幾位開始不為 0？`,
    a: `\\(${m}\\times10^{${n}}\\)`,
    validate: [n >= 0 ? `${n + 1}` : `${-n}`],
  };
};

export default scientificNotation2;
