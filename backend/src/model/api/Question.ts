import { QuestionTag } from 'src/model/entity/QuestionTag';
import { Question } from 'src/model/type/Question';

export type PostQuestionRequest = {
  content: string;
  answer?: string;
  solution?: string;
  tagId: string[];
};

export type PostQuestionResponse = Question;

export type PutQuestionRequest = {
  content: string;
  answer?: string;
  solution?: string;
  tagId: string[];
};

export type PutQuestionTagRequest = string[];

export type PutQuestionTagResponse = QuestionTag[];

export type GetQuestionParam = { tagId: string };

export type GetQuestionResponse = Question[];
