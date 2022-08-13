import { inject, injectable } from 'inversify';
import { Question } from 'src/model/entity/Question';
import { QuestionEntity } from 'src/model/entity/QuestionEntity';
import { Database } from 'src/util/Database';

/**
 * Access class for Question model.
 */
@injectable()
export class QuestionAccess {
  @inject(Database)
  private readonly database!: Database;

  public async save(question: Question) {
    const qr = await this.database.getQueryRunner();
    const entity = new QuestionEntity();
    Object.assign(entity, question);

    return await qr.manager.save(entity);
  }

  public async cleanup() {
    await this.database.cleanUp();
  }
}
