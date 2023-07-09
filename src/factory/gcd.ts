import uniqid from 'uniqid';
import { Question } from 'src/model/Common';
import { gcd as findGcd, randomElement, randomIntBetween } from 'src/util/math';

const gcd = (): Question => {
  const base = randomElement([1, 2, 3, 5, 7, 11, 13, 17, 19, 23, 29]);
  const a = base * randomIntBetween(1, 20);
  const b = base * randomIntBetween(1, 20);
  const c = findGcd(a, b);

  return { id: uniqid(), q: `求 ${a} 與 ${b} 的最大公因數`, a: `${c}`, validate: [`${c}`] };
};

export default gcd;
