import { Category } from './Common';
import { stages } from './Stages';

const elementaryCategories: Category[] = [
  { id: 'ele-1-1', name: '一上', stage: stages[0] },
  { id: 'ele-1-2', name: '一下', stage: stages[0] },
  { id: 'ele-2-1', name: '二上', stage: stages[0] },
  { id: 'ele-2-2', name: '二下', stage: stages[0] },
  { id: 'ele-3-1', name: '三上', stage: stages[0] },
  { id: 'ele-3-2', name: '三下', stage: stages[0] },
  { id: 'ele-4-1', name: '四上', stage: stages[0] },
  { id: 'ele-4-2', name: '四下', stage: stages[0] },
  { id: 'ele-5-1', name: '五上', stage: stages[0] },
  { id: 'ele-5-2', name: '五下', stage: stages[0] },
  { id: 'ele-6-1', name: '六上', stage: stages[0] },
  { id: 'ele-6-2', name: '六下', stage: stages[0] },
];

const juniorHighCategories: Category[] = [
  { id: 'jun-1-1', name: '一上', stage: stages[1] },
  { id: 'jun-1-2', name: '一下', stage: stages[1] },
  { id: 'jun-2-1', name: '二上', stage: stages[1] },
  { id: 'jun-2-2', name: '二下', stage: stages[1] },
  { id: 'jun-3-1', name: '三上', stage: stages[1] },
  { id: 'jun-3-2', name: '三下', stage: stages[1] },
];

const seniorHighCategories: Category[] = [
  { id: 'sen-1-1', name: '一上', stage: stages[2] },
  { id: 'sen-1-2', name: '一下', stage: stages[2] },
  { id: 'sen-2-1', name: '二上', stage: stages[2] },
  { id: 'sen-2-2', name: '二下', stage: stages[2] },
  { id: 'sen-3-1', name: '三上', stage: stages[2] },
  { id: 'sen-3-2', name: '三下', stage: stages[2] },
];

export const categories: Category[] = [
  ...elementaryCategories,
  ...juniorHighCategories,
  ...seniorHighCategories,
];
