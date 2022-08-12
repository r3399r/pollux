import { Type } from 'src/constant/Question';
import { Question } from 'src/model/entity/Question';
import { QuestionTag } from 'src/model/entity/QuestionTag';

export type PostQuestionRequest = {
  type: Type;
  content: string;
  answer?: string;
};

export type PostQuestionResponse = Question;

export type PostQuestionTagRequest = {
  questionId: string;
  tagId: string[];
}[];

export type PostQuestionTagResponse = QuestionTag[];
