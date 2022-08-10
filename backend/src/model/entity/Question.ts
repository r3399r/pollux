import { Type } from 'src/constant/Question';

export type Question = {
  id: string;
  type: Type;
  content: string;
  answer: string | null;
  userId: string;
  dateCreated: Date;
  dateUpdated: Date | null;
};
