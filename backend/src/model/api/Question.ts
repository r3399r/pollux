import { Type } from 'src/constant/Question';

export type PostQuestionRequest = {
  type: Type;
  content: string;
  answer?: string;
};

export type PostQuestionResponse = {
  id: string;
  type: Type;
  content: string;
  answer: string | null;
  userId: string;
  dateCreated: Date;
  dateUpdated: Date | null;
};
