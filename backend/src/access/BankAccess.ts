import { inject, injectable } from 'inversify';
import { FindManyOptions } from 'typeorm';
import { Bank } from 'src/model/entity/Bank';
import { BankEntity } from 'src/model/entity/BankEntity';
import { Database } from 'src/util/Database';

/**
 * Access class for Bank model.
 */
@injectable()
export class BankAccess {
  @inject(Database)
  private readonly database!: Database;

  public async findById(id: string) {
    const qr = await this.database.getQueryRunner();

    return await qr.manager.findOneByOrFail<Bank>(BankEntity.name, { id });
  }

  public async findMany(options?: FindManyOptions<Bank>) {
    const qr = await this.database.getQueryRunner();

    return await qr.manager.find<Bank>(BankEntity.name, options);
  }

  public async save(bank: Bank) {
    const qr = await this.database.getQueryRunner();
    const entity = new BankEntity();
    Object.assign(entity, bank);

    return await qr.manager.save(entity);
  }

  public async update(bank: Bank) {
    const qr = await this.database.getQueryRunner();
    const entity = new BankEntity();
    Object.assign(entity, bank);

    return await qr.manager.update(BankEntity, bank.id, entity);
  }

  public async hardDeleteById(id: string) {
    const qr = await this.database.getQueryRunner();

    return await qr.manager.delete(BankEntity.name, id);
  }

  public async cleanup() {
    await this.database.cleanUp();
  }
}
