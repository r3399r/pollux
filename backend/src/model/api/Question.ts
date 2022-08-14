import { Type } from 'src/constant/Question';
import { Question } from 'src/model/entity/Question';
import { QuestionTag } from 'src/model/entity/QuestionTag';
import { ViewQuestion } from 'src/model/viewEntity/ViewQuestion';

export type PostQuestionRequest = {
  type: Type;
  content: string;
  answer?: string;
};

export type PostQuestionResponse = Question;

export type PutQuestionRequest = {
  type: Type;
  content: string;
  answer?: string;
};

export type PutQuestionTagRequest = string[];

export type PutQuestionTagResponse = QuestionTag[];

export type GetQuestionParam = { tagId: string };

export type GetQuestionResponse = ViewQuestion[];
