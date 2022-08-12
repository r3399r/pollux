import { inject, injectable } from 'inversify';
import { FindManyOptions, FindOneOptions } from 'typeorm';
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

  public async findById(id: string) {
    const qr = await this.database.getQueryRunner();

    return await qr.manager.findOneBy<Question>(QuestionEntity.name, { id });
  }

  public async findOne(options: FindOneOptions<Question>) {
    const qr = await this.database.getQueryRunner();

    return await qr.manager.findOne<Question>(QuestionEntity.name, options);
  }

  public async findMany(options?: FindManyOptions<Question>) {
    const qr = await this.database.getQueryRunner();

    return await qr.manager.find<Question>(QuestionEntity.name, options);
  }

  public async save(question: Question) {
    const qr = await this.database.getQueryRunner();
    const entity = new QuestionEntity();
    Object.assign(entity, question);

    return await qr.manager.save(entity);
  }

  public async hardDeleteById(id: string) {
    const qr = await this.database.getQueryRunner();

    return await qr.manager.delete(QuestionEntity.name, id);
  }

  public async cleanup() {
    await this.database.cleanUp();
  }
}
