import { Bank } from 'src/model/entity/Bank';
import { BankQuestion } from 'src/model/entity/BankQuestion';
import { ViewBank } from 'src/model/viewEntity/ViewBank';

export type PostBankRequest = {
  name: string;
};

export type PostBankResponse = Bank;

export type GetBankResponse = ViewBank[];

export type PutBankRequest = {
  name: string;
};

export type PostBankQuestionRequest = string[];

export type PostBankQuestionResponse = BankQuestion[];
