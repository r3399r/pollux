import { QuestionValues, SavedQuestionValues, Topic } from 'src/model/Common';
import { topics } from 'src/model/Topics';

const getTopic = (topic: string): Topic => {
  const topicObj = topics.find((t) => t.id === topic);
  if (topicObj === undefined) throw Error('undefined topic');

  return topicObj;
};

const getCurrent = (topic: string) => {
  const localCurrent = localStorage.getItem(`${topic}-current`);

  return localCurrent ? (JSON.parse(localCurrent) as QuestionValues) : undefined;
};

const getHistory = (topic: string) => {
  const localHistory = localStorage.getItem(`${topic}-history`);

  return localHistory ? (JSON.parse(localHistory) as SavedQuestionValues[]) : undefined;
};

export const setAnswerIsRevealed = (topic: string) => {
  const current = getCurrent(topic);
  localStorage.setItem(`${topic}-current`, JSON.stringify({ ...current, isRevealed: true }));
};

export const onCorrectAnswer = (topic: string) => {
  const current = getCurrent(topic);

  if (current?.isWrong === undefined) {
    const continousStatus = Number(localStorage.getItem(`${topic}-continuous-status`) ?? '0');
    localStorage.setItem(
      `${topic}-continuous-status`,
      String(continousStatus > 0 ? continousStatus + 1 : 1),
    );
  }
};

export const onWrongAnswer = (topic: string) => {
  const current = getCurrent(topic);

  if (current?.isWrong === undefined) {
    const continousStatus = Number(localStorage.getItem(`${topic}-continuous-status`) ?? '0');
    localStorage.setItem(
      `${topic}-continuous-status`,
      String(continousStatus < 0 ? continousStatus - 1 : -1),
    );
  }

  localStorage.setItem(`${topic}-current`, JSON.stringify({ ...current, isWrong: true }));
};

export const removeRecord = (topic: string) => {
  localStorage.removeItem(`${topic}-current`);
  localStorage.removeItem(`${topic}-history`);
  localStorage.removeItem(`${topic}-level`);
  localStorage.removeItem(`${topic}-continuous-status`);
};

export const handleQuestion = (
  topic: string,
  next: boolean,
  save = true,
): { current: QuestionValues; history: SavedQuestionValues[] } => {
  const current = getCurrent(topic);
  const history = getHistory(topic);

  // if a question exists in localstorage, use it
  if (current !== undefined && next === false) return { current, history: history ?? [] };

  const thisTopic = getTopic(topic);

  let level = Number(localStorage.getItem(`${topic}-level`) ?? '0');
  if (thisTopic.levelDefinition && thisTopic.levelDefinition.length > level) {
    const currentLevelDefinition = thisTopic.levelDefinition[level];
    const continousStatus = Number(localStorage.getItem(`${topic}-continuous-status`) ?? '0');
    const maxLevel = thisTopic.levelDefinition.length - 1;

    let reset = false;
    if (currentLevelDefinition.upgrade && continousStatus >= currentLevelDefinition.upgrade) {
      level = Math.min(level + 1, maxLevel);
      reset = true;
    } else if (
      currentLevelDefinition.downgrade &&
      continousStatus < 0 &&
      Math.abs(continousStatus) >= currentLevelDefinition.downgrade
    ) {
      level = Math.max(level - 1, 0);
      reset = true;
    }

    if (reset) {
      localStorage.setItem(`${topic}-level`, String(level));
      localStorage.setItem(`${topic}-continuous-status`, '0');
    }
  }

  const question = thisTopic.factory.values(level);
  localStorage.setItem(`${topic}-current`, JSON.stringify(question));

  // directly return new question if first visit or not save
  if ((current === undefined && next === false) || save === false)
    return { current: question, history: history ?? [] };

  // save record then return new question
  let updatedHistory: SavedQuestionValues[] = [];
  if (current === undefined && history === undefined) updatedHistory = [];
  else if (current === undefined && history !== undefined) updatedHistory = [...history];
  else if (current !== undefined && history === undefined)
    updatedHistory = [
      {
        id: current.id,
        qp: current.qp,
        ap: current.ap,
        t: Date.now(),
      },
    ];
  else if (current !== undefined && history !== undefined)
    updatedHistory = [
      {
        id: current.id,
        qp: current.qp,
        ap: current.ap,
        t: Date.now(),
      },
      ...history,
    ];
  localStorage.setItem(`${topic}-history`, JSON.stringify(updatedHistory));

  return { current: question, history: updatedHistory ?? [] };
};
