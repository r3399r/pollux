import { Bank } from 'src/model/entity/Bank';
import { BankQuestion } from 'src/model/entity/BankQuestion';
import { BankUser } from 'src/model/entity/BankUser';
import { ViewBank } from 'src/model/viewEntity/ViewBank';

export type PostBankRequest = {
  name: string;
};

export type PostBankResponse = Bank;

export type GetBankResponse = ViewBank[];

export type PutBankRequest = {
  name: string;
};

export type PostBankAssignRequest = string[];

export type PostBankAssignResponse = BankUser[];

export type PostBankQuestionRequest = string[];

export type PostBankQuestionResponse = BankQuestion[];
