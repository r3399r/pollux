import { Type } from 'src/constant/Question';
import { Question } from 'src/model/entity/Question';

export type PostQuestionRequest = {
  type: Type;
  content: string;
  answer?: string;
};

export type PostQuestionResponse = Omit<Question, 'userId'>;
