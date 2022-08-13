import { inject, injectable } from 'inversify';
import { QuestionTag } from 'src/model/entity/QuestionTag';
import { QuestionTagEntity } from 'src/model/entity/QuestionTagEntity';
import { Database } from 'src/util/Database';

/**
 * Access class for QuestionTag model.
 */
@injectable()
export class QuestionTagAccess {
  @inject(Database)
  private readonly database!: Database;

  public async startTransaction() {
    const qr = await this.database.getQueryRunner();
    await qr.startTransaction();
  }

  public async commitTransaction() {
    const qr = await this.database.getQueryRunner();
    await qr.commitTransaction();
  }

  public async rollbackTransaction() {
    const qr = await this.database.getQueryRunner();
    await qr.rollbackTransaction();
  }

  public async saveMany(questionTag: QuestionTag[]) {
    const qr = await this.database.getQueryRunner();
    const entities: QuestionTagEntity[] = [];

    questionTag.forEach((v) => {
      const entity = new QuestionTagEntity();
      Object.assign(entity, v);
      entities.push(entity);
    });

    return await qr.manager.save(entities);
  }

  public async hardDeleteByQuestionId(id: string) {
    const qr = await this.database.getQueryRunner();

    return await qr.manager.delete(QuestionTagEntity.name, { questionId: id });
  }

  public async cleanup() {
    await this.database.cleanUp();
  }
}
