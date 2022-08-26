import { inject, injectable } from 'inversify';
import { FindManyOptions } from 'typeorm';
import { UserUser } from 'src/model/entity/UserUser';
import { UserUserEntity } from 'src/model/entity/UserUserEntity';
import { Database } from 'src/util/Database';

/**
 * Access class for UserUser model.
 */
@injectable()
export class UserUserAccess {
  @inject(Database)
  private readonly database!: Database;

  public async save(userUser: UserUser) {
    const qr = await this.database.getQueryRunner();
    const entity = new UserUserEntity();
    Object.assign(entity, userUser);

    return await qr.manager.save(entity);
  }

  public async findById(id: string) {
    const qr = await this.database.getQueryRunner();

    return await qr.manager.findOneByOrFail<UserUser>(UserUserEntity.name, {
      id,
    });
  }

  public async findMany(options?: FindManyOptions<UserUser>) {
    const qr = await this.database.getQueryRunner();

    return await qr.manager.find<UserUser>(UserUserEntity.name, options);
  }

  public async update(userUser: UserUser) {
    const qr = await this.database.getQueryRunner();
    const entity = new UserUserEntity();
    Object.assign(entity, userUser);

    return await qr.manager.update(UserUserEntity, userUser.id, entity);
  }

  public async hardDeleteById(id: string) {
    const qr = await this.database.getQueryRunner();

    return await qr.manager.delete(UserUserEntity.name, id);
  }

  public async cleanup() {
    await this.database.cleanUp();
  }
}
