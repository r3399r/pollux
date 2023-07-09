import uniqid from 'uniqid';
import { Question } from 'src/model/Common';
import { randomIntBetween } from 'src/util/math';

const add20 = (): Question => {
  const a = randomIntBetween(0, 20);
  const b = a < 11 ? randomIntBetween(11 - a, 20 - a) : randomIntBetween(0, 20 - a);
  const c = a + b;

  return { id: uniqid(), q: `\\(${a}+${b}=\\square\\)`, a: `${c}`, validate: [`${c}`] };
};

export default add20;
