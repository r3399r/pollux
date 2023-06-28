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

export enum Type {
  Add10 = 'add10',
  Minus10 = 'minus10',
  Add20 = 'add20',
  Minus20 = 'minus20',
  TimesTable = 'timesTable',
  RectArea = 'rectArea',
  Gcd = 'gcd',
  Lcm = 'lcm',
  Factorization = 'factorization',
  PrimeFactorization = 'primeFactorization',
  SimplifiyRadical = 'simplifyRadical',
  rationalize = 'rationalize',
  // triangleAreaFomula = 'triangleAreaFomula',
  // lawOfSines = 'lawOfSines',
  // lawOfCosines = 'lawOfCosines',
  // heronFormula = 'heronFormula',
}

export const TypeName: {
  [key in Type]: string;
} = {
  add10: '10以內的加法',
  minus10: '10以內的減法',
  add20: '20以內的加法',
  minus20: '20以內的減法',
  timesTable: '九九乘法',
  rectArea: '矩形面積',
  gcd: '最大公因數',
  lcm: '最小公倍數',
  factorization: '二次式因式分解',
  primeFactorization: '質因數分解',
  simplifyRadical: '根號化簡',
  rationalize: '有理化',
  // triangleAreaFomula: '面積公式',
  // lawOfSines: '正弦定理',
  // lawOfCosines: '餘弦定理',
  // heronFormula: '海龍公式',
};

export type Factory = {
  [key in Type]: () => Question;
};
