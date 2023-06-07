import { CurrentQuestion, Generator, HistoryQuestion, Question, Type } from 'src/model/Common';
import { add10, minus10 } from 'src/util/factory';

const generate = (type: Type): Question => {
  const map: Generator = { add10, minus10 };

  if (Object.values(Type).includes(type) === false) throw new Error(`type ${type} is invalid`);

  return map[type]();
};

export const handleQuestion = (type: Type, next: boolean): Question & { history: Question[] } => {
  const current = JSON.parse(localStorage.getItem('current') || '{}') as CurrentQuestion;
  const history = JSON.parse(localStorage.getItem('history') || '{}') as HistoryQuestion;

  const currentType = current[type];
  const historyType = history[type];

  if (currentType !== undefined && next === false)
    return { ...currentType, history: historyType ?? [] };

  const question = generate(type);
  localStorage.setItem('current', JSON.stringify({ ...current, [type]: question }));

  if (currentType === undefined && next === false)
    return { ...question, history: historyType ?? [] };

  if (currentType === undefined && historyType === undefined) history[type] = [];
  else if (currentType === undefined && historyType !== undefined) history[type] = [...historyType];
  else if (currentType !== undefined && historyType !== undefined)
    history[type] = [...historyType, currentType];
  else if (currentType !== undefined && historyType === undefined) history[type] = [currentType];
  localStorage.setItem('history', JSON.stringify({ ...history }));

  return { ...question, history: history[type] ?? [] };
};
