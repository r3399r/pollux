import uniqid from 'uniqid';
import { Factory, Question } from 'src/model/Common';
import {
  coefficient,
  primeFactorization as doPrimeFactorization,
  gcd as findGcd,
  lcm as findLcm,
  polynomial,
  randomElement,
  randomIntBetween,
} from './math';

const add10 = (): Question => {
  const c = randomIntBetween(0, 10);
  const a = randomIntBetween(0, c);
  const b = c - a;

  return { id: uniqid(), q: `\\(${a}+${b}=\\square\\)`, a: `${c}`, v: [`${c}`] };
};

const minus10 = (): Question => {
  const c = randomIntBetween(0, 10);
  const a = randomIntBetween(0, c);
  const b = c - a;

  return { id: uniqid(), q: `\\(${c}-${a}=\\square\\)`, a: `${b}`, v: [`${b}`] };
};

const add20 = (): Question => {
  const a = randomIntBetween(0, 20);
  const b = a < 11 ? randomIntBetween(11 - a, 20 - a) : randomIntBetween(0, 20 - a);
  const c = a + b;

  return { id: uniqid(), q: `\\(${a}+${b}=\\square\\)`, a: `${c}`, v: [`${c}`] };
};

const minus20 = (): Question => {
  const c = randomIntBetween(10, 20);
  const a = randomIntBetween(0, c);
  const b = c - a;

  return { id: uniqid(), q: `\\(${c}-${a}=\\square\\)`, a: `${b}`, v: [`${b}`] };
};

const timesTable = (): Question => {
  const a = randomIntBetween(1, 9);
  const b = randomIntBetween(1, 9);

  return { id: uniqid(), q: `\\(${a}\\times${b}=\\square\\)`, a: `${a * b}`, v: [`${a * b}`] };
};

const gcd = (): Question => {
  const base = randomElement([1, 2, 3, 5, 7, 11, 13, 17, 19, 23, 29]);
  const a = base * randomIntBetween(1, 20);
  const b = base * randomIntBetween(1, 20);
  const c = findGcd(a, b);

  return { id: uniqid(), q: `求 ${a} 與 ${b} 的最大公因數`, a: `${c}`, v: [`${c}`] };
};

const lcm = (): Question => {
  const a = randomIntBetween(2, 30);
  const b = randomIntBetween(2, 30);
  const c = findLcm(a, b);

  return { id: uniqid(), q: `求 ${a} 與 ${b} 的最小公倍數`, a: `${c}`, v: [`${c}`] };
};

const rectArea = (): Question => {
  const w = randomIntBetween(2, 10);
  const h = randomIntBetween(2, 10);
  const rotate = (randomIntBetween(0, 360) * Math.PI) / 180;

  const canvas = document.createElement('canvas');
  canvas.width = 150;
  canvas.height = 120;
  const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
  ctx.translate(canvas.width / 2, canvas.height / 2);
  ctx.rotate(rotate);

  ctx.beginPath();
  ctx.moveTo(-w * 4, -h * 4);
  ctx.lineTo(w * 4, -h * 4);
  ctx.lineTo(w * 4, h * 4);
  ctx.lineTo(-w * 4, h * 4);
  ctx.closePath();
  ctx.stroke();

  ctx.rotate(-rotate);

  ctx.font = '16px serif';
  ctx.fillText(w.toString(), -h * 4 * Math.sin(rotate), h * 4 * Math.cos(rotate));
  ctx.fillText(h.toString(), w * 4 * Math.cos(rotate), w * 4 * Math.sin(rotate));

  return { id: uniqid(), a: `${w * h}`, v: [`${w * h}`], img: canvas.toDataURL() };
};

// (ax+b)(cx+d)-> a*c, a*d+b*c, b*d
const factorization = (): Question => {
  const a = randomElement([1, 1, 1, 2, 2, 3]) * randomElement([-1, 1]);
  const c = randomElement([1, 1, 1, 2, 2, 3]) * randomElement([-1, 1]);
  const b = randomIntBetween(-10, 10);
  const d = randomIntBetween(1, 10) * randomElement([-1, 1]);

  const gcd1 = b === 0 ? a : (findGcd(Math.abs(a), Math.abs(b)) * a) / Math.abs(a);
  const gcd2 = d === 0 ? c : (findGcd(Math.abs(c), Math.abs(d)) * c) / Math.abs(c);
  const leading = gcd1 * gcd2;
  const a1 = a / gcd1;
  const b1 = b / gcd1;
  const c1 = c / gcd2;
  const d1 = d / gcd2;

  const first = b === 0 ? 'x' : `(${polynomial(a1, b1)})`;
  const second = d === 0 ? 'x' : `(${polynomial(c1, d1)})`;

  const ans = [
    `${coefficient(leading, `${first}${second}`, true)}`,
    `${coefficient(leading, `${second}${first}`, true)}`,
  ];

  return {
    id: uniqid(),
    q: `\\(${polynomial(a * c, a * d + b * c, b * d)}\\)`,
    a: `\\(${ans[0]}\\)`,
    v: ans,
  };
};

const primeFactorization = (): Question => {
  const q = randomIntBetween(2, 400);

  const factors = doPrimeFactorization(q);

  const ans: string[] = [];
  for (const b of new Set(factors)) {
    const n = factors.filter((f) => f === b).length;
    ans.push(n === 1 ? `${b}` : `${b}^${n}`);
  }

  return {
    id: uniqid(),
    q: `將 ${q} 質因數分解`,
    a: `\\(${ans.join('\\times')}\\)`,
    v: [factors.join()],
    h: '質因數輸入請由小到大、重複、以逗號分隔、無空白，例如：180 之答案為 2,2,3,3,5',
  };
};

export const factory: Factory = {
  add10,
  minus10,
  add20,
  minus20,
  timesTable,
  gcd,
  lcm,
  rectArea,
  factorization,
  primeFactorization,
};
