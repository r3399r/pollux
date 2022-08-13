import { inject, injectable } from 'inversify';
import { FindManyOptions } from 'typeorm';
import { ViewQuestion } from 'src/model/viewEntity/ViewQuestion';
import { ViewQuestionEntity } from 'src/model/viewEntity/ViewQuestionEntity';
import { Database } from 'src/util/Database';

/**
 * Access class for ViewQuestion model.
 */
@injectable()
export class ViewQuestionAccess {
  @inject(Database)
  private readonly database!: Database;

  public async findMany(options?: FindManyOptions<ViewQuestion>) {
    const qr = await this.database.getQueryRunner();

    return await qr.manager.find<ViewQuestion>(
      ViewQuestionEntity.name,
      options
    );
  }
}
