import uniqid from 'uniqid';
import { QuestionValues } from 'src/model/Common';
import { randomIntBetween } from 'src/util/math';

const values = (): QuestionValues => {
  const w = randomIntBetween(2, 10);
  const h = randomIntBetween(2, 10);
  const rotate = (randomIntBetween(0, 360) * Math.PI) / 180;

  return {
    id: uniqid(),
    qp: [w, h, rotate],
    ap: [w, h],
    validate: [`${w * h}`],
  };
};

const image = (w: number, h: number, rotate: number) => {
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

const answer = (w: number, h: number) => `${w * h}`;

export default { values, image, answer };
