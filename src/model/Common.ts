export type QaForm = {
  ans: string;
};

export type QuestionValues = {
  id: string;
  qp?: (number | string)[]; // question params
  ap: (number | string)[]; // answer params
  validate: string[]; // answer for validation
  isRevealed?: boolean; // answer is revealed
  isWrong?: boolean; // reply wrong answer for the first time
};

export type Factory = {
  values: (level?: number) => QuestionValues;
  question?: (...params: (number | string)[]) => string;
  image?: (...params: (number | string)[]) => string;
  answer?: (...params: (number | string)[]) => string;
};

export type SavedQuestionValues = Pick<QuestionValues, 'id' | 'qp' | 'ap'> & { t: number };

export type Stage = {
  id: string;
  name: string;
};

export type Category = {
  id: string;
  name: string;
  stage: Stage;
};

export type Topic = {
  id: string;
  name: string;
  category: Category;
  factory: Factory;
  levelDefinition?: {
    upgrade: number | null;
    downgrade: number | null;
  }[];
  hint?: { rules: string[]; example: string };
};
