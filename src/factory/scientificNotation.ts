import uniqid from 'uniqid';
import { Question } from 'src/model/Common';
import { bn } from 'src/util/bignumber';
import { randomFloatBetween, randomIntBetween } from 'src/util/math';

const scientificNotation = (): Question => {
  const m = randomFloatBetween(1, 9.999, 3);
  const n = randomIntBetween(-10, 10);
  const q = bn(10).pow(n).times(m).toString();

  return {
    id: uniqid(),
    q: `\\(${q}=a\\times10^n\\)`,
    a: `\\(${m}\\times10^{${n}}\\)`,
    validate: [`${m},${n}`],
    hint: {
      rules: ['依序填入 m,n', '以逗號分隔、無空白'],
      example: '3.42,-2',
    },
  };
};

export default scientificNotation;
