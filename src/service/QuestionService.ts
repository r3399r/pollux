import { CurrentQuestion, HistoryQuestion, Question, SavedQuestion, Type } from 'src/model/Common';
import { factory } from 'src/util/factory';

const generate = (type: Type): Question => {
  if (Object.values(Type).includes(type) === false) throw new Error(`type ${type} is invalid`);

  return factory[type]();
};

export const handleQuestion = (
  type: Type,
  next: boolean,
): Question & { history: SavedQuestion[] } => {
  const currentAll = JSON.parse(localStorage.getItem('current') || '{}') as CurrentQuestion;
  const historyAll = JSON.parse(localStorage.getItem('history') || '{}') as HistoryQuestion;

  const current = currentAll[type];
  const history = historyAll[type]?.map((v) => ({
    id: v.id,
    img: v.img,
    q: v.q,
    a: v.a,
  }));

  if (current !== undefined && next === false) return { ...current, history: history ?? [] };

  const question = generate(type);
  localStorage.setItem('current', JSON.stringify({ ...currentAll, [type]: question }));

  if (current === undefined && next === false) return { ...question, history: history ?? [] };

  if (current === undefined && history === undefined) historyAll[type] = [];
  else if (current === undefined && history !== undefined) historyAll[type] = [...history];
  else if (current !== undefined && history === undefined)
    historyAll[type] = [
      {
        id: current.id,
        img: current.img,
        q: current.q,
        a: current.a,
      },
    ];
  else if (current !== undefined && history !== undefined)
    historyAll[type] = [
      {
        id: current.id,
        img: current.img,
        q: current.q,
        a: current.a,
      },
      ...history,
    ];
  localStorage.setItem('history', JSON.stringify({ ...historyAll }));

  return { ...question, history: historyAll[type] ?? [] };
};
