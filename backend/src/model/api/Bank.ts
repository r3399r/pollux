import { Bank } from 'src/model/entity/Bank';

export type PostBankRequest = {
  name: string;
};

export type PostBankResponse = Bank;

export type GetBankResponse = Bank[];

export type PutBankRequest = {
  name: string;
};
