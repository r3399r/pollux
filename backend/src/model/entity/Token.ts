import {
  DbBase,
  DbService,
  entity,
  ModelBase,
  primaryAttribute,
  relatedAttributeOne,
} from '@y-celestial/service';
import { inject, injectable } from 'inversify';

export type Token = DbBase & {
  token: string;
  purpose: string;
  expiredDate?: number;
  userId: string;
};

/**
 * Entity class for Token
 */
@entity('token')
class TokenEntity implements Token {
  @primaryAttribute()
  public token: string;
  public purpose: string;
  public expiredDate?: number;

  @relatedAttributeOne('user')
  public userId: string;

  public dateCreated?: number;
  public dateUpdated?: number;
  public dateDeleted?: number;

  constructor(input: Token) {
    this.token = input.token;
    this.purpose = input.purpose;
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
  private alias = 'token';

  async find(id: string) {
    return await this.dbService.getItem<Token>(this.alias, id);
  }

  async findAll() {
    return await this.dbService.getItems<Token>(this.alias);
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
    await this.dbService.deleteItem(this.alias, id);
  }
}
