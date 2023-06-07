export type QaForm = {
  ans: string;
};

export type Question = {
  q: string; // question
  a: string; // answer
};

export enum Type {
  Add = 'add',
  Minus = 'minus',
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
