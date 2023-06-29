export type QaForm = {
  ans: string;
};

export type Question = {
  id: string;
  img?: string;
  q?: string; // question
  a: string; // answer
  validate: string[]; // answer for validation
  hint?: { rules: string[]; example: string }; // hint
  hasViewed?: boolean;
};

export type SavedQuestion = Pick<Question, 'id' | 'img' | 'q' | 'a'>;

export type Factory = {
  [key in Type]: () => Question;
};

// 分類
export enum Category {
  Elementary,
  JuniorHigh,
  SeniorHigh,
}

// 題型
export enum Type {
  Add10 = 'add-10',
  Minus10 = 'minus-10',
  Add20 = 'add-20',
  Minus20 = 'minus-20',
  TimesTable = 'times-table',
  RectArea = 'rectangle-area',
  Gcd = 'greatest-common-divisor',
  Lcm = 'least-common-multiple',
  PrimeFactorization = 'prime-factorization',
  Factorization = 'factorization',
  SimplifiyRadical = 'simplify-radical',
  Rationalize = 'rationalize',
}

export const CategoryType: {
  category: Category;
  name: string;
  types: { type: Type; name: string }[];
}[] = [
  {
    category: Category.Elementary,
    name: '國小數學',
    types: [
      { type: Type.Add10, name: '10以內的加法' },
      { type: Type.Minus10, name: '10以內的減法' },
      { type: Type.TimesTable, name: '九九乘法' },
      { type: Type.RectArea, name: '矩形面積' },
      { type: Type.Gcd, name: '最大公因數' },
      { type: Type.Lcm, name: '最小公倍數' },
      { type: Type.PrimeFactorization, name: '質因數分解' },
    ],
  },
  {
    category: Category.JuniorHigh,
    name: '國中數學',
    types: [
      { type: Type.Factorization, name: '二次式因式分解' },
      { type: Type.SimplifiyRadical, name: '根號化簡' },
      { type: Type.Rationalize, name: '根號有理化' },
    ],
  },
];
