import add10 from 'src/factory/add10';
import add100 from 'src/factory/add100';
import arcLengthFormula from 'src/factory/arcLengthFormula';
import commonLogarithm from 'src/factory/commonLogarithm';
import completingTheSquare from 'src/factory/completingTheSquare';
import degreeRadianTransform from 'src/factory/degreeRadianTransform';
import distributiveLaw from 'src/factory/distributiveLaw';
import divisionPoint from 'src/factory/divisionPoint';
import factorization from 'src/factory/factorization';
import gcd from 'src/factory/gcd';
import lcm from 'src/factory/lcm';
import minus10 from 'src/factory/minus10';
import multipleFormula1 from 'src/factory/multipleFormula1';
import multipleFormula2 from 'src/factory/multipleFormula2';
import multipleFormula2Ex from 'src/factory/multipleFormula2Ex';
import primeFactorization from 'src/factory/primeFactorization';
import proportion from 'src/factory/proportion';
import rationalize from 'src/factory/rationalize';
import rectArea from 'src/factory/rectArea';
import scientificNotation1 from 'src/factory/scientificNotation1';
import scientificNotation2 from 'src/factory/scientificNotation2';
import sectorAreaFormula from 'src/factory/sectorAreaFormula';
import simplifyRadical from 'src/factory/simplifyRadical';
import timesTable from 'src/factory/timesTable';

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

type Category = {
  id: string;
  name: string;
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

export const categories: Category[] = [
  { id: 'elementary', name: '國小數學' },
  { id: 'junior-high', name: '國中數學' },
  { id: 'senior-high', name: '高中數學' },
];

export const topics: Topic[] = [
  {
    id: 'add-10',
    name: '10以內的加法',
    category: categories[0],
    factory: add10,
  },
  {
    id: 'minus-10',
    name: '10以內的減法',
    category: categories[0],
    factory: minus10,
  },
  {
    id: 'add-100',
    name: '雙位數的加法',
    category: categories[0],
    factory: add100,
    levelDefinition: [
      { upgrade: 5, downgrade: null },
      { upgrade: 5, downgrade: 3 },
      { upgrade: 5, downgrade: 3 },
      { upgrade: null, downgrade: 2 },
    ],
  },
  {
    id: 'times-table',
    name: '九九乘法',
    category: categories[0],
    factory: timesTable,
  },
  {
    id: 'rectangle-area',
    name: '矩形面積',
    category: categories[0],
    factory: rectArea,
  },
  {
    id: 'greatest-common-divisor',
    name: '最大公因數',
    category: categories[0],
    factory: gcd,
  },
  {
    id: 'least-common-multiple',
    name: '最小公倍數',
    category: categories[0],
    factory: lcm,
  },
  {
    id: 'prime-factorization',
    name: '質因數分解',
    category: categories[0],
    factory: primeFactorization,
    hint: {
      rules: ['質因數由小到大排列', '重複的質因數請重複輸入', '以逗號或空白分隔'],
      example: '2,2,3,3,5',
    },
  },
  {
    id: 'proportion',
    name: '比例式',
    category: categories[1],
    factory: proportion,
    levelDefinition: [
      { upgrade: 2, downgrade: null },
      { upgrade: 3, downgrade: 3 },
      { upgrade: 3, downgrade: 3 },
      { upgrade: null, downgrade: 2 },
    ],
    hint: {
      rules: ['若答案為分數請用 / 表示', '若為負數，請將負號寫在最前面'],
      example: '-2/3',
    },
  },
  {
    id: 'scientific-notation-1',
    name: '科學記號(一)',
    category: categories[1],
    factory: scientificNotation1,
    hint: {
      rules: ['依序填入 a,n', '\\(n\\) 為整數且 \\(1\\le a<10\\)', '以逗號或空白分隔'],
      example: '3.42 -2',
    },
  },
  {
    id: 'scientific-notation-2',
    name: '科學記號(二)',
    category: categories[1],
    factory: scientificNotation2,
  },
  {
    id: 'distributive-law',
    name: '乘法分配律',
    category: categories[1],
    factory: distributiveLaw,
    hint: {
      rules: ['依序填入 a,b,c', '以逗號或空白分隔'],
      example: '1,2,-5',
    },
  },
  {
    id: 'multiple-formula-1',
    name: '乘法公式(一)',
    category: categories[1],
    factory: multipleFormula1,
    hint: {
      rules: ['依序填入 a,b,c', '以逗號或空白分隔'],
      example: '1,-4,4',
    },
  },
  {
    id: 'factorization',
    name: '二次式因式分解',
    category: categories[1],
    factory: factorization,
    hint: {
      rules: ['依序填入 k,a,b,c,d', 'a,c 為正數', '以逗號或空白分隔'],
      example: '-1,2,-3,1,4',
    },
  },
  {
    id: 'simplify-radical',
    name: '根號化簡',
    category: categories[1],
    factory: simplifyRadical,
    hint: {
      rules: ['依序填入 a,b', '化至最簡', '以逗號或空白分隔'],
      example: '2,2,3,3,5',
    },
  },
  {
    id: 'rationalize',
    name: '根號有理化',
    category: categories[1],
    factory: rationalize,
    hint: {
      rules: ['依序填入 a,b,c', '化至最簡', '以逗號或空白分隔'],
      example: '1,2,5',
    },
  },
  {
    id: 'completing-the-square',
    name: '配方法',
    category: categories[1],
    factory: completingTheSquare,
    hint: {
      rules: ['依序填入 a,h,k', '以逗號或空白分隔'],
      example: '2,-1,3',
    },
  },
  {
    id: 'multiple-foamula-2',
    name: '乘法公式(二)',
    category: categories[2],
    factory: multipleFormula2,
    hint: {
      rules: ['依序填入 a,b,c,d', '以逗號或空白分隔'],
      example: '1,-6,9,27',
    },
  },
  {
    id: 'multiple-formula-2-ex',
    name: '乘法公式(二) 題型',
    category: categories[2],
    factory: multipleFormula2Ex,
    hint: {
      rules: ['依序填入 a,b', '以逗號或空白分隔'],
      example: '3,10',
    },
  },
  {
    id: 'division-point',
    name: '分點公式',
    category: categories[2],
    factory: divisionPoint,
    hint: {
      rules: ['若答案為分數請用 / 表示', '若為負數，請將負號寫在最前面'],
      example: '-2/3',
    },
  },
  {
    id: 'common-logarithm',
    name: '常用對數',
    category: categories[2],
    factory: commonLogarithm,
    hint: {
      rules: ['若答案為分數請用 / 表示', '若為負數，請將負號寫在最前面'],
      example: '-2/3',
    },
  },
  {
    id: 'degree-radian-transform',
    name: '角度弧度換算',
    category: categories[2],
    factory: degreeRadianTransform,
    hint: {
      rules: [
        '特殊符號可在這複製：圓周率「π」，度「°」',
        '分數請化到最簡',
        '答案輸入方式請參考下方',
      ],
      example: '8π/5 或 117°',
    },
  },
  {
    id: 'arc-length-formula',
    name: '弧長公式',
    category: categories[2],
    factory: arcLengthFormula,
  },
  {
    id: 'sector-area-formula',
    name: '扇形面積公式',
    category: categories[2],
    factory: sectorAreaFormula,
  },
];
