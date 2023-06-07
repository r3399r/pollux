export type QaForm = {
  ans: string;
};

export type Question = {
  id: string;
  q: string; // question
  a: string; // answer
};

export enum Type {
  Add10 = 'add10',
  Minus10 = 'minus10',
  Add20 = 'add20',
  Minus20 = 'minus20',
}

export type Generator = {
  [key in Type]: () => Question;
};

export type LanguageMapping = {
  [key in Type]: string;
};

export type CurrentQuestion = {
  [key in Type]?: Question;
};

export type HistoryQuestion = {
  [key in Type]?: Question[];
};
