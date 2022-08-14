import { BadRequestError, NotFoundError } from '@y-celestial/service';
import { inject, injectable } from 'inversify';
import { BankAccess } from 'src/access/BankAccess';
import { BankQuestionAccess } from 'src/access/BankQuestionAccess';
import {
  GetBankResponse,
  PostBankQuestionRequest,
  PostBankQuestionResponse,
  PostBankRequest,
  PostBankResponse,
  PutBankRequest,
} from 'src/model/api/Bank';
import { BankEntity } from 'src/model/entity/BankEntity';
import { BankQuestionEntity } from 'src/model/entity/BankQuestionEntity';
import { cognitoSymbol } from 'src/util/LambdaSetup';

/**
 * Service class for Bank
 */
@injectable()
export class BankService {
  @inject(cognitoSymbol)
  private readonly cognitoUserId!: string;

  @inject(BankAccess)
  private readonly bankAccess!: BankAccess;

  @inject(BankQuestionAccess)
  private readonly bankQuestionAccess!: BankQuestionAccess;

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
    return await this.bankAccess.findMany({
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

  public async addBankQuestionPair(
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
}
