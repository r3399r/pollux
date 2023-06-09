import uniqid from 'uniqid';
import { Factory, Question } from 'src/model/Common';
import { findGcf, randomIntBetween } from './math';

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

const gcd = (): Question => {
  const a = randomIntBetween(1, 100);
  const b = randomIntBetween(1, 100);
  const c = findGcf(a, b);

  return { id: uniqid(), q: `求 ${a} 與 ${b} 的最大公因數`, a: c.toString() };
};

const rectArea = () => {
  const w = randomIntBetween(2, 10);
  const h = randomIntBetween(2, 10);

  const canvas = document.createElement('canvas');
  canvas.width = 150;
  canvas.height = 120;
  const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

  ctx.beginPath();
  ctx.moveTo(75 - w * 4, 50 - h * 4);
  ctx.lineTo(75 + w * 4, 50 - h * 4);
  ctx.lineTo(75 + w * 4, 50 + h * 4);
  ctx.lineTo(75 - w * 4, 50 + h * 4);
  ctx.closePath();
  ctx.stroke();

  ctx.font = '16px serif';
  ctx.fillText(w.toString(), 75, 50 + h * 4);
  ctx.fillText(h.toString(), 75 + w * 4, 50);

  return { id: uniqid(), q: '求面積', a: (w * h).toString(), img: canvas.toDataURL() };
};

export const factory: Factory = {
  add10,
  minus10,
  add20,
  minus20,
  gcd,
  rectArea,
};
