import { Question, SavedQuestion, topics } from 'src/model/Common';

const generate = (topic: string): Question => {
  const topicObj = topics.find((t) => t.id === topic);
  if (topicObj === undefined) throw Error('undefined topic');

  return topicObj.factory();
};

export const setCurrentHasViewed = (topic: string) => {
  const localCurrent = localStorage.getItem(`${topic}-current`);
  const current = localCurrent ? (JSON.parse(localCurrent) as Question) : undefined;

  localStorage.setItem(`${topic}-current`, JSON.stringify({ ...current, hasViewed: true }));
};

export const removeRecord = (topic: string) => {
  localStorage.removeItem(`${topic}-history`);
};

export const handleQuestion = (
  topic: string,
  next: boolean,
  save = true,
): { current: Question; history: SavedQuestion[] } => {
  const localCurrent = localStorage.getItem(`${topic}-current`);
  const localHistory = localStorage.getItem(`${topic}-history`);
  const current = localCurrent ? (JSON.parse(localCurrent) as Question) : undefined;
  const history = localHistory ? (JSON.parse(localHistory) as SavedQuestion[]) : undefined;

  if (current !== undefined && next === false) return { current, history: history ?? [] };

  const question = generate(topic);
  localStorage.setItem(`${topic}-current`, JSON.stringify(question));

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
        t: Date.now(),
      },
    ];
  else if (current !== undefined && history !== undefined)
    updatedHistory = [
      {
        id: current.id,
        img: current.img,
        q: current.q,
        a: current.a,
        t: Date.now(),
      },
      ...history,
    ];
  localStorage.setItem(`${topic}-history`, JSON.stringify(updatedHistory));

  return { current: question, history: updatedHistory ?? [] };
};
