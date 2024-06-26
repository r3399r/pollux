import uniqid from 'uniqid';
import { QuestionValues } from 'src/model/Common';
import { randomInt } from 'src/util/math';

const values = (): QuestionValues => {
  const w = randomInt(2, 10);
  const h = randomInt(2, 10);
  const rotate = (randomInt(0, 360) * Math.PI) / 180;

  return {
    id: uniqid(),
    qp: [w, h, rotate],
    ap: [w, h],
    validate: [`${w * h}`],
  };
};

const image = (w: number | string, h: number | string, rotate: number | string) => {
  if (typeof w === 'string') w = Number(w);
  if (typeof h === 'string') h = Number(h);
  if (typeof rotate === 'string') rotate = Number(rotate);

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

  return canvas.toDataURL();
};

const answer = (w: number | string, h: number | string) => {
  if (typeof w === 'string') w = Number(w);
  if (typeof h === 'string') h = Number(h);

  return `${w * h}`;
};

export default { values, image, answer };
