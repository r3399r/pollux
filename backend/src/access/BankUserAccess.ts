import { inject, injectable } from 'inversify';
import { BankUser } from 'src/model/entity/BankUser';
import { BankUserEntity } from 'src/model/entity/BankUserEntity';
import { Database } from 'src/util/Database';

/**
 * Access class for BankUser model.
 */
@injectable()
export class BankUserAccess {
  @inject(Database)
  private readonly database!: Database;

  public async saveMany(bankUser: BankUser[]) {
    const qr = await this.database.getQueryRunner();
    const entities: BankUserEntity[] = [];

    bankUser.forEach((v) => {
      const entity = new BankUserEntity();
      Object.assign(entity, v);
      entities.push(entity);
    });

    return await qr.manager.save(entities);
  }

  public async hardDeleteBy(bankId: string, userId: string) {
    const qr = await this.database.getQueryRunner();

    return await qr.manager.delete(BankUserEntity.name, {
      bankId,
      userId,
    });
  }
}
