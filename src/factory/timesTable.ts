import uniqid from 'uniqid';
import { Question } from 'src/model/Common';
import { randomIntBetween } from 'src/util/math';

const timesTable = (): Question => {
  const a = randomIntBetween(1, 9);
  const b = randomIntBetween(1, 9);

  return {
    id: uniqid(),
    q: `\\(${a}\\times${b}=\\square\\)`,
    a: `${a * b}`,
    validate: [`${a * b}`],
  };
};

export default timesTable;
