import { Type } from 'src/constant/Question';
import { Question } from 'src/model/entity/Question';

export type PostQuestionRequest = {
  label: string;
  type: Type;
  question: string;
  answer?: string;
};

export type PostQuestionResponse = Question;
