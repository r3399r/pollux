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

export type Question = {
  id: string;
  img?: string;
  q?: string; // question
  a: string; // answer
  validate: string[]; // answer for validation
  hint?: { rules: string[]; example: string }; // hint
  isRevealed?: boolean; // answer is revealed
  isWrong?: boolean; // reply wrong answer for the first time
};

export type SavedQuestion = Pick<Question, 'id' | 'img' | 'q' | 'a'> & { t: number };

type Category = {
  id: string;
  name: string;
};

export type Topic = {
  id: string;
  name: string;
  category: Category;
  factory: (level?: number) => Question;
  maxLevel?: number;
  upgradeNeed?: number;
  downgradeNeed?: number;
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
    maxLevel: 3,
    upgradeNeed: 5,
    downgradeNeed: 4,
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
  },
  {
    id: 'scientific-notation-1',
    name: '科學記號(一)',
    category: categories[1],
    factory: scientificNotation1,
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
  },
  {
    id: 'multiple-formula-1',
    name: '乘法公式(一)',
    category: categories[1],
    factory: multipleFormula1,
  },
  {
    id: 'factorization',
    name: '二次式因式分解',
    category: categories[1],
    factory: factorization,
  },
  {
    id: 'simplify-radical',
    name: '根號化簡',
    category: categories[1],
    factory: simplifyRadical,
  },
  {
    id: 'rationalize',
    name: '根號有理化',
    category: categories[1],
    factory: rationalize,
  },
  {
    id: 'completing-the-square',
    name: '配方法',
    category: categories[1],
    factory: completingTheSquare,
  },
  {
    id: 'multiple-foamula-2',
    name: '乘法公式(二)',
    category: categories[2],
    factory: multipleFormula2,
  },
  {
    id: 'multiple-formula-2-ex',
    name: '乘法公式(二) 題型',
    category: categories[2],
    factory: multipleFormula2Ex,
  },
  {
    id: 'division-point',
    name: '分點公式',
    category: categories[2],
    factory: divisionPoint,
  },
  {
    id: 'common-logarithm',
    name: '常用對數',
    category: categories[2],
    factory: commonLogarithm,
  },
  {
    id: 'degree-radian-transform',
    name: '角度弧度換算',
    category: categories[2],
    factory: degreeRadianTransform,
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
