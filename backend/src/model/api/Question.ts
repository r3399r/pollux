import { QuestionTag } from 'src/model/entity/QuestionTag';
import { QuestionType } from 'src/model/type/Question';

export type PostQuestionRequest = {
  content: string;
  answer?: string;
  solution?: string;
  isMathjax: boolean;
  tagId: string[];
};

export type PostQuestionResponse = QuestionType;

export type PutQuestionRequest = {
  content: string;
  answer?: string;
  solution?: string;
  isMathjax: boolean;
  tagId: string[];
};

export type PutQuestionTagRequest = string[];

export type PutQuestionTagResponse = QuestionTag[];

export type GetQuestionParam = { tagId: string };

export type GetQuestionResponse = QuestionType[];
