export type QaForm = {
  answer: string;
};

export type Question = {
  question: string;
  answer: string;
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
