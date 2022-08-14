import { Bank } from 'src/model/entity/Bank';
import { BankQuestion } from 'src/model/entity/BankQuestion';

export type PostBankRequest = {
  name: string;
};

export type PostBankResponse = Bank;

export type GetBankResponse = Bank[];

export type PutBankRequest = {
  name: string;
};

export type PostBankQuestionRequest = string[];

export type PostBankQuestionResponse = BankQuestion[];
