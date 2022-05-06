import { Bank } from 'src/model/entity/Bank';

export type PostBankRequest = {
  name: string;
  questionId: string[];
};

export type PostBankResponse = Bank;
