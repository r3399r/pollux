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

export const ENTITY = 'token';

export type Token = DbBase & {
  token: string;
  expiredDate?: number;
  userId: string;
};

/**
 * Entity class for Token
 */
@entity(ENTITY)
class TokenEntity implements Token {
  @primaryAttribute()
  public token: string;
  public expiredDate?: number;

  @relatedAttributeOne(USER_ENTITY)
  public userId: string;

  public dateCreated?: number;
  public dateUpdated?: number;
  public dateDeleted?: number;

  constructor(input: Token) {
    this.token = input.token;
    this.expiredDate = input.expiredDate;
    this.userId = input.userId;
    this.dateCreated = input.dateCreated;
    this.dateUpdated = input.dateUpdated;
    this.dateDeleted = input.dateDeleted;
  }
}

@injectable()
export class TokenModel implements ModelBase {
  @inject(DbService)
  private readonly dbService!: DbService;

  async find(id: string) {
    return await this.dbService.getItem<Token>(ENTITY, id);
  }

  async findAll() {
    return await this.dbService.getItems<Token>(ENTITY);
  }

  async create(data: Token): Promise<void> {
    await this.dbService.createItem<Token>(
      new TokenEntity({
        ...data,
        dateCreated: Date.now(),
        dateUpdated: Date.now(),
      })
    );
  }

  async replace(data: Token): Promise<void> {
    await this.dbService.putItem<Token>(
      new TokenEntity({
        ...data,
        dateUpdated: Date.now(),
      })
    );
  }

  async softDelete(id: string): Promise<void> {
    const token = await this.find(id);
    await this.replace({ ...token, dateDeleted: Date.now() });
  }

  async hardDelete(id: string): Promise<void> {
    await this.dbService.deleteItem(ENTITY, id);
  }
}
