import { stage, Stage } from './Stages';

enum CATEGORY {
  ELEMENTARY_1_1 = 'elementary-1-1',
  ELEMENTARY_1_2 = 'elementary-1-2',
  ELEMENTARY_2_1 = 'elementary-2-1',
  ELEMENTARY_2_2 = 'elementary-2-2',
  ELEMENTARY_3_1 = 'elementary-3-1',
  ELEMENTARY_3_2 = 'elementary-3-2',
  ELEMENTARY_4_1 = 'elementary-4-1',
  ELEMENTARY_4_2 = 'elementary-4-2',
  ELEMENTARY_5_1 = 'elementary-5-1',
  ELEMENTARY_5_2 = 'elementary-5-2',
  ELEMENTARY_6_1 = 'elementary-6-1',
  ELEMENTARY_6_2 = 'elementary-6-2',

  JUNIOR_HIGH_1_1 = 'junior-high-1-1',
  JUNIOR_HIGH_1_2 = 'junior-high-1-2',
  JUNIOR_HIGH_2_1 = 'junior-high-2-1',
  JUNIOR_HIGH_2_2 = 'junior-high-2-2',
  JUNIOR_HIGH_3_1 = 'junior-high-3-1',
  JUNIOR_HIGH_3_2 = 'junior-high-3-2',

  SENIOR_HIGH_1_1 = 'senior-high-1-1',
  SENIOR_HIGH_1_2 = 'senior-high-1-2',
  SENIOR_HIGH_2_1 = 'senior-high-2-1',
  SENIOR_HIGH_2_2 = 'senior-high-2-2',
  SENIOR_HIGH_3_1 = 'senior-high-3-1',
  SENIOR_HIGH_3_2 = 'senior-high-3-2',
}

export type Category = {
  key: CATEGORY;
  name: string;
  stage: Stage;
};

export const category = {
  [CATEGORY.ELEMENTARY_1_1]: {
    key: CATEGORY.ELEMENTARY_1_1,
    name: '小一上',
    stage: stage.elementary,
  },
  [CATEGORY.ELEMENTARY_1_2]: {
    key: CATEGORY.ELEMENTARY_1_2,
    name: '小一下',
    stage: stage.elementary,
  },
  [CATEGORY.ELEMENTARY_2_1]: {
    key: CATEGORY.ELEMENTARY_2_1,
    name: '小二上',
    stage: stage.elementary,
  },
  [CATEGORY.ELEMENTARY_4_2]: {
    key: CATEGORY.ELEMENTARY_4_2,
    name: '小四下',
    stage: stage.elementary,
  },
  [CATEGORY.ELEMENTARY_6_1]: {
    key: CATEGORY.ELEMENTARY_6_1,
    name: '小六上',
    stage: stage.elementary,
  },
  [CATEGORY.JUNIOR_HIGH_1_1]: {
    key: CATEGORY.JUNIOR_HIGH_1_1,
    name: '國一上',
    stage: stage['junior-high'],
  },
  [CATEGORY.JUNIOR_HIGH_1_2]: {
    key: CATEGORY.JUNIOR_HIGH_1_2,
    name: '國一下',
    stage: stage['junior-high'],
  },
  [CATEGORY.JUNIOR_HIGH_2_1]: {
    key: CATEGORY.JUNIOR_HIGH_2_1,
    name: '國二上',
    stage: stage['junior-high'],
  },
  [CATEGORY.SENIOR_HIGH_1_1]: {
    key: CATEGORY.SENIOR_HIGH_1_1,
    name: '高一上',
    stage: stage['senior-high'],
  },
  [CATEGORY.SENIOR_HIGH_2_1]: {
    key: CATEGORY.SENIOR_HIGH_2_1,
    name: '高二上',
    stage: stage['senior-high'],
  },
};
