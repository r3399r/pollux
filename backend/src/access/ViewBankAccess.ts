import { inject, injectable } from 'inversify';
import { FindManyOptions } from 'typeorm';
import { ViewBank } from 'src/model/viewEntity/ViewBank';
import { ViewBankEntity } from 'src/model/viewEntity/ViewBankEntity';
import { Database } from 'src/util/Database';

/**
 * Access class for ViewBank model.
 */
@injectable()
export class ViewBankAccess {
  @inject(Database)
  private readonly database!: Database;

  public async findMany(options?: FindManyOptions<ViewBank>) {
    const qr = await this.database.getQueryRunner();

    return await qr.manager.find<ViewBank>(ViewBankEntity.name, options);
  }
}
