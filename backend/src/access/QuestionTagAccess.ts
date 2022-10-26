import { inject, injectable } from 'inversify';
import { FindManyOptions } from 'typeorm';
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

  public async findMany(options?: FindManyOptions<QuestionTag>) {
    const qr = await this.database.getQueryRunner();

    return await qr.manager.find<QuestionTag>(QuestionTagEntity.name, options);
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

  public async hardDeleteById(id: string) {
    const qr = await this.database.getQueryRunner();

    return await qr.manager.delete(QuestionTagEntity.name, id);
  }
}
