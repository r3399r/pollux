import {
  DbBase,
  DbService,
  entity,
  ModelBase,
  primaryAttribute,
  relatedAttributeOne,
} from '@y-celestial/service';
import { inject, injectable } from 'inversify';
import { ENTITY as USER_ENTITY } from './User';

export const ENTITY = 'bank';

export type Bank = DbBase & {
  id: string;
  name: string;
  ownerId: string;
};

/**
 * Entity class for Bank
 */
@entity(ENTITY)
class BankEntity implements Bank {
  @primaryAttribute()
  public id: string;
  public name: string;
  @relatedAttributeOne(USER_ENTITY)
  public ownerId: string;

  public dateCreated?: number;
  public dateUpdated?: number;
  public dateDeleted?: number;

  constructor(input: Bank) {
    this.id = input.id;
    this.name = input.name;
    this.ownerId = input.ownerId;
    this.dateCreated = input.dateCreated;
    this.dateUpdated = input.dateUpdated;
    this.dateDeleted = input.dateDeleted;
  }
}

@injectable()
export class BankModel implements ModelBase {
  @inject(DbService)
  private readonly dbService!: DbService;

  async find(id: string) {
    return await this.dbService.getItem<Bank>(ENTITY, id);
  }

  async findAll() {
    return await this.dbService.getItems<Bank>(ENTITY);
  }

  async findAllByOwner(userId: string) {
    return await this.dbService.getItemsByIndex<Bank>(
      ENTITY,
      USER_ENTITY,
      userId
    );
  }

  async create(data: Bank): Promise<void> {
    await this.dbService.createItem<Bank>(
      new BankEntity({
        ...data,
        dateCreated: Date.now(),
        dateUpdated: Date.now(),
      })
    );
  }

  async replace(data: Bank): Promise<void> {
    await this.dbService.putItem<Bank>(
      new BankEntity({
        ...data,
        dateUpdated: Date.now(),
      })
    );
  }

  async softDelete(id: string): Promise<void> {
    const question = await this.find(id);
    await this.replace({ ...question, dateDeleted: Date.now() });
  }

  async hardDelete(id: string): Promise<void> {
    await this.dbService.deleteItem(ENTITY, id);
  }
}
