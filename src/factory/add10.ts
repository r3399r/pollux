import uniqid from 'uniqid';
import { Question } from 'src/model/Common';
import { randomIntBetween } from 'src/util/math';

const add10 = (): Question => {
  const c = randomIntBetween(0, 10);
  const a = randomIntBetween(0, c);
  const b = c - a;

  return { id: uniqid(), q: `\\(${a}+${b}=\\square\\)`, a: `${c}`, validate: [`${c}`] };
};

export default add10;
