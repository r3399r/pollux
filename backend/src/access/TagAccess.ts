import { inject, injectable } from 'inversify';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import { Tag } from 'src/model/entity/Tag';
import { TagEntity } from 'src/model/entity/TagEntity';
import { Database } from 'src/util/Database';

/**
 * Access class for Tag model.
 */
@injectable()
export class TagAccess {
  @inject(Database)
  private readonly database!: Database;

  public async findById(id: string) {
    const qr = await this.database.getQueryRunner();

    return await qr.manager.findOneBy<Tag>(TagEntity.name, { id });
  }

  public async findOne(options: FindOneOptions<Tag>) {
    const qr = await this.database.getQueryRunner();

    return await qr.manager.findOne<Tag>(TagEntity.name, options);
  }

  public async findMany(options?: FindManyOptions<Tag>) {
    const qr = await this.database.getQueryRunner();

    return await qr.manager.find<Tag>(TagEntity.name, options);
  }

  public async save(trip: Tag) {
    const qr = await this.database.getQueryRunner();
    const entity = new TagEntity();
    Object.assign(entity, trip);

    return await qr.manager.save(entity);
  }

  public async hardDeleteById(id: string) {
    const qr = await this.database.getQueryRunner();

    return await qr.manager.delete(TagEntity.name, id);
  }

  public async cleanup() {
    await this.database.cleanUp();
  }
}
