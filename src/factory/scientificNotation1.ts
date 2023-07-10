import uniqid from 'uniqid';
import { Question } from 'src/model/Common';
import { bn } from 'src/util/bignumber';
import { randomFloatBetween, randomIntBetween } from 'src/util/math';

const scientificNotation1 = (): Question => {
  const m = randomFloatBetween(1, 9.99, 2);
  const n = randomIntBetween(-10, 10);
  const q = bn(10).pow(n).times(m).toFixed();

  return {
    id: uniqid(),
    q: `\\(${q}=a\\times10^n\\)`,
    a: `\\(${m}\\times10^{${n}}\\)`,
    validate: [`${m},${n}`],
    hint: {
      rules: ['依序填入 a,n', '\\(n\\) 為整數且 \\(1\\le a<10\\)', '以逗號或空白分隔'],
      example: '3.42 -2',
    },
  };
};

export default scientificNotation1;
