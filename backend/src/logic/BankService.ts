import { BadRequestError, NotFoundError } from '@y-celestial/service';
import { CognitoIdentityServiceProvider } from 'aws-sdk';
import { inject, injectable } from 'inversify';
import { BankAccess } from 'src/access/BankAccess';
import { BankQuestionAccess } from 'src/access/BankQuestionAccess';
import { BankUserAccess } from 'src/access/BankUserAccess';
import { ViewBankAccess } from 'src/access/ViewBankAccess';
import {
  GetBankResponse,
  PostBankAssignRequest,
  PostBankAssignResponse,
  PostBankQuestionRequest,
  PostBankQuestionResponse,
  PostBankRequest,
  PostBankResponse,
  PutBankRequest,
} from 'src/model/api/Bank';
import { BankEntity } from 'src/model/entity/BankEntity';
import { BankQuestionEntity } from 'src/model/entity/BankQuestionEntity';
import { BankUserEntity } from 'src/model/entity/BankUserEntity';
import { cognitoSymbol } from 'src/util/LambdaSetup';

/**
 * Service class for Bank
 */
@injectable()
export class BankService {
  @inject(CognitoIdentityServiceProvider)
  private readonly cognitoIdentityServiceProvider!: CognitoIdentityServiceProvider;

  @inject(cognitoSymbol)
  private readonly cognitoUserId!: string;

  @inject(BankAccess)
  private readonly bankAccess!: BankAccess;

  @inject(ViewBankAccess)
  private readonly vBankAccess!: ViewBankAccess;

  @inject(BankQuestionAccess)
  private readonly bankQuestionAccess!: BankQuestionAccess;

  @inject(BankUserAccess)
  private readonly bankUserAccess!: BankUserAccess;

  public async cleanup() {
    await this.bankAccess.cleanup();
  }

  public async createBank(data: PostBankRequest): Promise<PostBankResponse> {
    const bank = new BankEntity();
    bank.name = data.name;
    bank.userId = this.cognitoUserId;

    return await this.bankAccess.save(bank);
  }

  public async getBankOfUser(): Promise<GetBankResponse> {
    return await this.vBankAccess.findMany({
      where: { userId: this.cognitoUserId },
    });
  }

  public async updateBank(id: string, data: PutBankRequest) {
    const oldBank = await this.bankAccess.findById(id);
    if (oldBank.userId !== this.cognitoUserId)
      throw new NotFoundError('not found');

    const bank = new BankEntity();
    bank.id = id;
    bank.name = data.name;
    bank.userId = this.cognitoUserId;

    const res = await this.bankAccess.update(bank);

    if (res.affected === 0) throw new BadRequestError('nothing happened.');
  }

  public async deleteBank(id: string) {
    const bank = await this.bankAccess.findById(id);
    if (bank.userId !== this.cognitoUserId)
      throw new NotFoundError('not found');

    const res = await this.bankAccess.hardDeleteById(id);

    if (res.affected === 0) throw new BadRequestError('nothing happened.');
  }

  public async addBankUserPairs(
    id: string,
    data: PostBankAssignRequest
  ): Promise<PostBankAssignResponse> {
    await Promise.all(
      data.map(async (v) => {
        const res = await this.cognitoIdentityServiceProvider
          .adminGetUser({
            UserPoolId: process.env.USER_POOL_ID ?? '',
            Username: v,
          })
          .promise();
        if (res.UserStatus !== 'CONFIRMED')
          throw new BadRequestError('user unconfirmed');
      })
    );

    const bank = await this.bankAccess.findById(id);
    if (bank.userId !== this.cognitoUserId)
      throw new NotFoundError('not found');

    const entities = data.map((v) => {
      const bankUser = new BankUserEntity();
      bankUser.bankId = id;
      bankUser.userId = v;

      return bankUser;
    });

    return await this.bankUserAccess.saveMany(entities);
  }

  public async deleteBankUserPair(id: string, uid: string) {
    const bank = await this.bankAccess.findById(id);
    if (bank.userId !== this.cognitoUserId)
      throw new NotFoundError('not found');

    const res = await this.bankUserAccess.hardDeleteBy(id, uid);

    if (res.affected === 0) throw new BadRequestError('nothing happened.');
  }

  public async addBankQuestionPairs(
    id: string,
    data: PostBankQuestionRequest
  ): Promise<PostBankQuestionResponse> {
    const bank = await this.bankAccess.findById(id);
    if (bank.userId !== this.cognitoUserId)
      throw new NotFoundError('not found');

    const entities = data.map((v) => {
      const bankQuestion = new BankQuestionEntity();
      bankQuestion.bankId = id;
      bankQuestion.questionId = v;

      return bankQuestion;
    });

    return await this.bankQuestionAccess.saveMany(entities);
  }

  public async deleteBankQuestionPair(id: string, qid: string) {
    const bank = await this.bankAccess.findById(id);
    if (bank.userId !== this.cognitoUserId)
      throw new NotFoundError('not found');

    const res = await this.bankQuestionAccess.hardDeleteBy(id, qid);

    if (res.affected === 0) throw new BadRequestError('nothing happened.');
  }
}
