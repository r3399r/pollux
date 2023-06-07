export type QaForm = {
  answer: string;
};

export type Question = {
  question: string;
  answer: string;
};

export type Generator = {
  add: () => Question;
  minus: () => Question;
};
