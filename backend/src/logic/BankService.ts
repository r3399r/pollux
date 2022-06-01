import { UnauthorizedError } from '@y-celestial/service';
import { inject, injectable } from 'inversify';
import { v4 as uuidv4 } from 'uuid';
import {
  GetBankIdResponse,
  GetBankResponse,
  PostBankRequest,
  PostBankResponse,
  PutBankIdRequest,
  PutBankIdResponse,
} from 'src/model/api/Bank';
import { Bank, BankModel } from 'src/model/entity/Bank';
import { BankQuestionModel } from 'src/model/entity/BankQuestion';
import { QuestionModel } from 'src/model/entity/Question';
import { TokenModel } from 'src/model/entity/Token';
import { tokenSymbol } from 'src/util/LambdaSetup';

/**
 * Service class for Bank
 */
@injectable()
export class BankService {
  @inject(BankModel)
  private readonly bankModel!: BankModel;
  @inject(TokenModel)
  private readonly tokenModel!: TokenModel;
  @inject(QuestionModel)
  private readonly questionModel!: QuestionModel;
  @inject(BankQuestionModel)
  private readonly bankQuestionModel!: BankQuestionModel;
  @inject(tokenSymbol)
  private readonly token!: string;

  public async createBank(data: PostBankRequest): Promise<PostBankResponse> {
    const { userId } = await this.tokenModel.find(this.token);

    // check if question exist and is owned by user
    const questions = await this.questionModel.findAllByOwner(userId);
    const questionIds = questions.map((v) => v.id);
    const isIncluded = data.questionId.every(
      (id) => questionIds.indexOf(id) > -1
    );
    if (!isIncluded) throw new UnauthorizedError('unauthorized');

    const bank: Bank = {
      id: uuidv4(),
      name: data.name,
      ownerId: userId,
    };
    await this.bankModel.create(bank);

    for (const [i, id] of data.questionId.entries())
      await this.bankQuestionModel.create({
        id: uuidv4(),
        bankId: bank.id,
        questionId: id,
        order: i,
      });

    return bank;
  }

  public async getBank(): Promise<GetBankResponse> {
    const { userId } = await this.tokenModel.find(this.token);

    return await this.bankModel.findAllByOwner(userId);
  }

  public async getBankById(id: string): Promise<GetBankIdResponse> {
    const { userId } = await this.tokenModel.find(this.token);
    const bank = await this.bankModel.find(id);

    if (bank.ownerId !== userId) throw new UnauthorizedError('unauthorized');

    const bankQuestions = await this.bankQuestionModel.findAllByBank(bank.id);

    const res: GetBankIdResponse = [];
    for (const bq of bankQuestions) {
      const q = await this.questionModel.find(bq.questionId);
      res.push({ ...q, order: bq.order });
    }

    return res;
  }

  public async modifyBank(
    id: string,
    data: PutBankIdRequest
  ): Promise<PutBankIdResponse> {
    const { userId } = await this.tokenModel.find(this.token);
    const bank = await this.bankModel.find(id);

    if (bank.ownerId !== userId) throw new UnauthorizedError('unauthorized');

    if (bank.name !== data.name)
      await this.bankModel.replace({ ...bank, name: data.name });

    const bankQuestions = await this.bankQuestionModel.findAllByBank(id);

    if (bankQuestions.length >= data.questionId.length)
      // new bank has less questions than before
      for (const [i, bq] of bankQuestions.entries()) {
        if (i >= data.questionId.length)
          await this.bankQuestionModel.hardDelete(bq.id);
        else if (bq.questionId !== data.questionId[i])
          await this.bankQuestionModel.replace({
            ...bq,
            questionId: data.questionId[i],
            order: i,
          });
      }
    // new bank has more questions than before
    else
      for (const [i, qId] of data.questionId.entries())
        if (i >= bankQuestions.length)
          await this.bankQuestionModel.create({
            id: uuidv4(),
            bankId: id,
            questionId: qId,
            order: i,
          });
        else if (qId !== bankQuestions[i].id)
          await this.bankQuestionModel.replace({
            ...bankQuestions[i],
            questionId: data.questionId[i],
            order: i,
          });

    return bank;
  }

  public async deleteBank(id: string): Promise<void> {
    const { userId } = await this.tokenModel.find(this.token);
    const bank = await this.bankModel.find(id);

    if (bank.ownerId !== userId) throw new UnauthorizedError('unauthorized');

    await this.bankQuestionModel.hardDeleteAllByBank(bank.id);
    await this.bankModel.hardDelete(id);
  }
}
