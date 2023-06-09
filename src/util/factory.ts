import uniqid from 'uniqid';
import { Factory, Question } from 'src/model/Common';
import { gcd as findGcd, lcm as findLcm, randomElement, randomIntBetween } from './math';

const add10 = (): Question => {
  const c = randomIntBetween(0, 10);
  const a = randomIntBetween(0, c);
  const b = c - a;

  return { id: uniqid(), q: `\\(${a}+${b}=\\square\\)`, a: c.toString() };
};

const minus10 = (): Question => {
  const c = randomIntBetween(0, 10);
  const a = randomIntBetween(0, c);
  const b = c - a;

  return { id: uniqid(), q: `\\(${c}-${a}=\\square\\)`, a: b.toString() };
};

const add20 = (): Question => {
  const a = randomIntBetween(0, 20);
  const b = a < 11 ? randomIntBetween(11 - a, 20 - a) : randomIntBetween(0, 20 - a);
  const c = a + b;

  return { id: uniqid(), q: `\\(${a}+${b}=\\square\\)`, a: c.toString() };
};

const minus20 = (): Question => {
  const c = randomIntBetween(10, 20);
  const a = randomIntBetween(0, c);
  const b = c - a;

  return { id: uniqid(), q: `\\(${c}-${a}=\\square\\)`, a: b.toString() };
};

const timesTable = (): Question => {
  const a = randomIntBetween(1, 9);
  const b = randomIntBetween(1, 9);

  return { id: uniqid(), q: `\\(${a}\\times${b}=\\square\\)`, a: (a * b).toString() };
};

const gcd = (): Question => {
  const base = randomElement([1, 2, 3, 5, 7, 11, 13, 17, 19, 23, 29]);
  const a = base * randomIntBetween(1, 20);
  const b = base * randomIntBetween(1, 20);
  const c = findGcd(a, b);

  return { id: uniqid(), q: `求 ${a} 與 ${b} 的最大公因數`, a: c.toString() };
};

const lcm = (): Question => {
  const a = randomIntBetween(2, 30);
  const b = randomIntBetween(2, 30);
  const c = findLcm(a, b);

  return { id: uniqid(), q: `求 ${a} 與 ${b} 的最小公倍數`, a: c.toString() };
};

const rectArea = () => {
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

  return { id: uniqid(), a: (w * h).toString(), img: canvas.toDataURL() };
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
};
