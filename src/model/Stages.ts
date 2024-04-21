enum STAGE {
  ELEMENTARY = 'elementary',
  JUNIOR_HIGH = 'junior-high',
  SENIOR_HIGH = 'senior-high',
}
export type Stage = {
  key: STAGE;
  name: string;
};

export const stage = {
  [STAGE.ELEMENTARY]: { key: STAGE.ELEMENTARY, name: '國小數學' },
  [STAGE.JUNIOR_HIGH]: { key: STAGE.JUNIOR_HIGH, name: '國中數學' },
  [STAGE.SENIOR_HIGH]: { key: STAGE.SENIOR_HIGH, name: '高中數學' },
};
