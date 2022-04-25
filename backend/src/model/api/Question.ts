import { Type } from 'src/constant/Question';
import { Label } from 'src/model/entity/Label';
import { Question } from 'src/model/entity/Question';

export type PostQuestionRequest = {
  labelId: string;
  type: Type;
  question: string;
  answer?: string;
};

export type PostQuestionResponse = Question;

export type PostQuestionLabelRequest = {
  label: string;
};

export type PostQuestionLabelResponse = Label;

export type GetQuestionLabelResponse = Label[];
