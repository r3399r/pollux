import { Question, SavedQuestion, Type } from 'src/model/Common';
import { factory } from 'src/util/factory';

const generate = (type: Type): Question => {
  if (Object.values(Type).includes(type) === false) throw new Error(`type ${type} is invalid`);

  return factory[type]();
};

export const setCurrentHasViewed = (type: Type) => {
  const localCurrent = localStorage.getItem(`${type}-current`);
  const current = localCurrent ? (JSON.parse(localCurrent) as Question) : undefined;

  localStorage.setItem(`${type}-current`, JSON.stringify({ ...current, hasViewed: true }));
};

export const removeRecord = (type: Type) => {
  localStorage.removeItem(`${type}-history`);
};

export const handleQuestion = (
  type: Type,
  next: boolean,
  save = true,
): { current: Question; history: SavedQuestion[] } => {
  const localCurrent = localStorage.getItem(`${type}-current`);
  const localHistory = localStorage.getItem(`${type}-history`);
  const current = localCurrent ? (JSON.parse(localCurrent) as Question) : undefined;
  const history = localHistory ? (JSON.parse(localHistory) as SavedQuestion[]) : undefined;

  if (current !== undefined && next === false) return { current, history: history ?? [] };

  const question = generate(type);
  localStorage.setItem(`${type}-current`, JSON.stringify(question));

  if ((current === undefined && next === false) || save === false)
    return { current: question, history: history ?? [] };

  let updatedHistory: SavedQuestion[] = [];
  if (current === undefined && history === undefined) updatedHistory = [];
  else if (current === undefined && history !== undefined) updatedHistory = [...history];
  else if (current !== undefined && history === undefined)
    updatedHistory = [
      {
        id: current.id,
        img: current.img,
        q: current.q,
        a: current.a,
      },
    ];
  else if (current !== undefined && history !== undefined)
    updatedHistory = [
      {
        id: current.id,
        img: current.img,
        q: current.q,
        a: current.a,
      },
      ...history,
    ];
  localStorage.setItem(`${type}-history`, JSON.stringify(updatedHistory));

  return { current: question, history: updatedHistory ?? [] };
};
