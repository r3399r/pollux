import { UnauthorizedError } from '@y-celestial/service';
import { inject, injectable } from 'inversify';
import { v4 as uuidv4 } from 'uuid';
import { PostBankRequest, PostBankResponse } from 'src/model/api/Bank';
import { Bank, BankModel } from 'src/model/entity/Bank';
import { BankQuestionModel } from 'src/model/entity/BankQuestion';
import { QuestionModel } from 'src/model/entity/Question';
import { TokenModel } from 'src/model/entity/Token';

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

  public async createBank(
    token: string,
    data: PostBankRequest
  ): Promise<PostBankResponse> {
    const { userId } = await this.tokenModel.find(token);

    // check question exist and is owned by user
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
}
