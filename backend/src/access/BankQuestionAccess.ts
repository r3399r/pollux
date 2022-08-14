import { inject, injectable } from 'inversify';
import { BankQuestion } from 'src/model/entity/BankQuestion';
import { BankQuestionEntity } from 'src/model/entity/BankQuestionEntity';
import { Database } from 'src/util/Database';

/**
 * Access class for BankQuestion model.
 */
@injectable()
export class BankQuestionAccess {
  @inject(Database)
  private readonly database!: Database;

  public async saveMany(bankQuestion: BankQuestion[]) {
    const qr = await this.database.getQueryRunner();
    const entities: BankQuestionEntity[] = [];

    bankQuestion.forEach((v) => {
      const entity = new BankQuestionEntity();
      Object.assign(entity, v);
      entities.push(entity);
    });

    return await qr.manager.save(entities);
  }

  public async hardDeleteBy(bankId: string, questionId: string) {
    const qr = await this.database.getQueryRunner();

    return await qr.manager.delete(BankQuestionEntity.name, {
      bankId,
      questionId,
    });
  }
}
