import uniqid from 'uniqid';
import { Factory, Question, Type } from 'src/model/Common';
import {
  coefficient,
  primeFactorization as doPrimeFactorization,
  simplifyRadical as doSimplifyRadical,
  gcd as findGcd,
  lcm as findLcm,
  polynomial,
  randomElement,
  randomIntBetween,
  rationalizeSingle,
} from './math';

const add10 = (): Question => {
  const c = randomIntBetween(0, 10);
  const a = randomIntBetween(0, c);
  const b = c - a;

  return { id: uniqid(), q: `\\(${a}+${b}=\\square\\)`, a: `${c}`, validate: [`${c}`] };
};

const minus10 = (): Question => {
  const c = randomIntBetween(0, 10);
  const a = randomIntBetween(0, c);
  const b = c - a;

  return { id: uniqid(), q: `\\(${c}-${a}=\\square\\)`, a: `${b}`, validate: [`${b}`] };
};

const add20 = (): Question => {
  const a = randomIntBetween(0, 20);
  const b = a < 11 ? randomIntBetween(11 - a, 20 - a) : randomIntBetween(0, 20 - a);
  const c = a + b;

  return { id: uniqid(), q: `\\(${a}+${b}=\\square\\)`, a: `${c}`, validate: [`${c}`] };
};

const minus20 = (): Question => {
  const c = randomIntBetween(10, 20);
  const a = randomIntBetween(0, c);
  const b = c - a;

  return { id: uniqid(), q: `\\(${c}-${a}=\\square\\)`, a: `${b}`, validate: [`${b}`] };
};

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

const gcd = (): Question => {
  const base = randomElement([1, 2, 3, 5, 7, 11, 13, 17, 19, 23, 29]);
  const a = base * randomIntBetween(1, 20);
  const b = base * randomIntBetween(1, 20);
  const c = findGcd(a, b);

  return { id: uniqid(), q: `求 ${a} 與 ${b} 的最大公因數`, a: `${c}`, validate: [`${c}`] };
};

const lcm = (): Question => {
  const a = randomIntBetween(2, 30);
  const b = randomIntBetween(2, 30);
  const c = findLcm(a, b);

  return { id: uniqid(), q: `求 ${a} 與 ${b} 的最小公倍數`, a: `${c}`, validate: [`${c}`] };
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

  return { id: uniqid(), a: `${w * h}`, validate: [`${w * h}`], img: canvas.toDataURL() };
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

  const validate = [[leading, a1, b1, c1, d1].join(), [leading, c1, d1, a1, b1].join()];

  return {
    id: uniqid(),
    q: `將 \\(${polynomial(a * c, a * d + b * c, b * d)}\\) 化簡為 \\(k(ax+b)(cx+d)\\)`,
    a: `\\(${coefficient(leading, `${first}${second}`, true)}\\)`,
    validate,
    hint: {
      rules: ['依序填入 k,a,b,c,d', 'a,c 為正數', '以逗號分隔、無空白'],
      example: '-1,2,-3,1,4',
    },
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
    validate: [factors.join()],
    hint: {
      rules: ['質因數由小到大排列', '重複的質因數請重複輸入', '以逗號分隔、無空白'],
      example: '2,2,3,3,5',
    },
  };
};

const simplifyRadical = (): Question => {
  let c = 1;
  let n = 1;
  let q = 1;

  while (c === 1 || n === 1) {
    q = randomIntBetween(8, 400);
    const res = doSimplifyRadical(q);
    c = res.coefficient;
    n = res.n;
  }

  return {
    id: uniqid(),
    q: `化簡 \\(\\sqrt{${q}}=a\\sqrt b\\)`,
    a: `\\(${c}\\sqrt{${n}}\\)`,
    validate: [`${c},${n}`],
    hint: {
      rules: ['依序填入 a,b', '化至最簡', '以逗號分隔、無空白'],
      example: '2,2,3,3,5',
    },
  };
};

const rationalize = (): Question => {
  let denominator = 1;
  let numerator = 1;
  let a = { numeratorCoefficient: 1, numeratorRadical: 1, denominator: 1 };
  let q = '';

  while (denominator === numerator || a.numeratorRadical === 1) {
    denominator = randomIntBetween(2, 20);
    numerator = randomIntBetween(1, 20);
    a = rationalizeSingle(denominator, numerator);
  }

  // 1: sqrt{a}/sqrt{b}, 2: sqrt{a/b}, 3: a/sqrt{b}
  const type = randomIntBetween(1, 3);
  switch (type) {
    case 1:
      q = `化簡 \\(\\dfrac{\\sqrt{${numerator}}}{\\sqrt{${denominator}}}=\\dfrac{a\\sqrt b}{c}\\)`;
      break;
    case 2:
      q = `化簡 \\(\\sqrt{\\dfrac{${numerator}}{${denominator}}}=\\dfrac{a\\sqrt b}{c}\\)`;
      break;
    case 3:
      q = `化簡 \\(\\dfrac{${numerator}}{\\sqrt{${denominator}}}=\\dfrac{a\\sqrt b}{c}\\)`;
      break;
  }

  const ansNumerator = coefficient(a.numeratorCoefficient, `\\sqrt{${a.numeratorRadical}}`, true);
  const ans = a.denominator === 1 ? ansNumerator : `\\dfrac{${ansNumerator}}{${a.denominator}}`;

  return {
    id: uniqid(),
    q,
    a: `\\(${ans}\\)`,
    validate: [[a.numeratorCoefficient, a.numeratorRadical, a.denominator].join()],
    hint: {
      rules: ['依序填入 a,b,c', '化至最簡', '以逗號分隔、無空白'],
      example: '1,2,5',
    },
  };
};

export const factory: Factory = {
  [Type.Add10]: add10,
  [Type.Minus10]: minus10,
  [Type.Add20]: add20,
  [Type.Minus20]: minus20,
  [Type.TimesTable]: timesTable,
  [Type.RectArea]: rectArea,
  [Type.Gcd]: gcd,
  [Type.Lcm]: lcm,
  [Type.Factorization]: factorization,
  [Type.PrimeFactorization]: primeFactorization,
  [Type.SimplifiyRadical]: simplifyRadical,
  [Type.Rationalize]: rationalize,
};
