export type QaForm = {
  ans: string;
};

export type Question = {
  id: string;
  img?: string;
  q?: string; // question
  a: string; // answer
};

export enum Type {
  Add10 = 'add10',
  Minus10 = 'minus10',
  Add20 = 'add20',
  Minus20 = 'minus20',
  Gcd = 'gcd',
  RectArea = 'rectArea',
}

export const LangZhTw: {
  [key in Type]: string;
} = {
  add10: '10以內的加法',
  minus10: '10以內的減法',
  add20: '20以內的加法',
  minus20: '20以內的減法',
  gcd: '最大公因數',
  rectArea: '矩形面積',
};

export type Factory = {
  [key in Type]: () => Question;
};

export type CurrentQuestion = {
  [key in Type]?: Question;
};

export type HistoryQuestion = {
  [key in Type]?: Question[];
};
