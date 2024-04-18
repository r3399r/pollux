import { Category } from './Common';
import { stages } from './Stages';

const elementaryCategories: Category[] = [
  { id: 'ele-1st-1', name: '一上', stage: stages[0] },
  { id: 'ele-2nd-1', name: '二上', stage: stages[0] },
];

const juniorHighCategories: Category[] = [
  { id: 'jun-1st-1', name: '一上', stage: stages[1] },
  { id: 'jun-2st-1', name: '二上', stage: stages[1] },
];

const seniorHighCategories: Category[] = [
  { id: 'sen-1st-1', name: '一上', stage: stages[2] },
  { id: 'sen-2st-1', name: '二上', stage: stages[2] },
];

export const categories: Category[] = [
  ...elementaryCategories,
  ...juniorHighCategories,
  ...seniorHighCategories,
];
