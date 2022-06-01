import { Bank } from 'src/model/entity/Bank';
import { Question } from 'src/model/entity/Question';

export type PostBankRequest = {
  name: string;
  questionId: string[];
};

export type PostBankResponse = Bank;

export type GetBankResponse = Bank[];

export type GetBankIdResponse = (Question & {
  order: number;
})[];

export type PutBankIdRequest = {
  name: string;
  questionId: string[];
};

export type PutBankIdResponse = Bank;
