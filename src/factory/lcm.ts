import uniqid from 'uniqid';
import { Question } from 'src/model/Common';
import { lcm as findLcm, randomIntBetween } from 'src/util/math';

const lcm = (): Question => {
  const a = randomIntBetween(2, 30);
  const b = randomIntBetween(2, 30);
  const c = findLcm(a, b);

  return { id: uniqid(), q: `求 ${a} 與 ${b} 的最小公倍數`, a: `${c}`, validate: [`${c}`] };
};

export default lcm;
