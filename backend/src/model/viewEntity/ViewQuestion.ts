import { Type } from 'src/constant/Question';

export type ViewQuestion = {
  id: string;
  type: Type;
  content: string;
  answer: string | null;
  userId: string;
  dateCreated: Date;
  dateUpdated: Date | null;
  tag: string[] | null;
};
