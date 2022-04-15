import {
  DbBase,
  DbService,
  entity,
  ModelBase,
  primaryAttribute,
} from '@y-celestial/service';
import { inject, injectable } from 'inversify';

export type User = DbBase & {
  id: string;
  nickname: string;
};

/**
 * Entity class for User
 */
@entity('user')
class UserEntity implements User {
  @primaryAttribute()
  public id: string;
  public nickname: string;

  public dateCreated?: number;
  public dateUpdated?: number;
  public dateDeleted?: number;

  constructor(input: User) {
    this.id = input.id;
    this.nickname = input.nickname;
    this.dateCreated = input.dateCreated;
    this.dateUpdated = input.dateUpdated;
    this.dateDeleted = input.dateDeleted;
  }
}

@injectable()
export class UserModel implements ModelBase {
  @inject(DbService)
  private readonly dbService!: DbService;
  private alias = 'user';

  async find(id: string) {
    return await this.dbService.getItem<User>(this.alias, id);
  }

  async findAll() {
    return await this.dbService.getItems<User>(this.alias);
  }

  async create(data: User): Promise<void> {
    await this.dbService.createItem<User>(
      new UserEntity({
        ...data,
        dateCreated: Date.now(),
        dateUpdated: Date.now(),
      })
    );
  }

  async replace(data: User): Promise<void> {
    await this.dbService.putItem<User>(
      new UserEntity({
        ...data,
        dateUpdated: Date.now(),
      })
    );
  }

  async softDelete(id: string): Promise<void> {
    const user = await this.find(id);
    await this.replace({ ...user, dateDeleted: Date.now() });
  }

  async hardDelete(id: string): Promise<void> {
    await this.dbService.deleteItem(this.alias, id);
  }
}
