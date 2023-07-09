import uniqid from 'uniqid';
import { Question } from 'src/model/Common';
import { randomIntBetween } from 'src/util/math';

const minus10 = (): Question => {
  const c = randomIntBetween(0, 10);
  const a = randomIntBetween(0, c);
  const b = c - a;

  return { id: uniqid(), q: `\\(${c}-${a}=\\square\\)`, a: `${b}`, validate: [`${b}`] };
};

export default minus10;
