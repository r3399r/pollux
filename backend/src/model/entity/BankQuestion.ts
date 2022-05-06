import {
  DbBase,
  DbService,
  entity,
  ModelBase,
  primaryAttribute,
  relatedAttributeOne,
} from '@y-celestial/service';
import { inject, injectable } from 'inversify';
import { ENTITY as BANK_ENTITY } from './Bank';
import { ENTITY as QUESTION_ENTITY } from './Question';

export const ENTITY = 'bankQuestion';

export type BankQuestion = DbBase & {
  id: string;
  bankId: string;
  questionId: string;
  order: number;
};

/**
 * Entity class for BankQuestion
 */
@entity(ENTITY)
class BankQuestionEntity implements BankQuestion {
  @primaryAttribute()
  public id: string;
  @relatedAttributeOne(BANK_ENTITY)
  public bankId: string;
  @relatedAttributeOne(QUESTION_ENTITY)
  public questionId: string;
  public order: number;

  public dateCreated?: number;
  public dateUpdated?: number;
  public dateDeleted?: number;

  constructor(input: BankQuestion) {
    this.id = input.id;
    this.bankId = input.bankId;
    this.questionId = input.questionId;
    this.order = input.order;
    this.dateCreated = input.dateCreated;
    this.dateUpdated = input.dateUpdated;
    this.dateDeleted = input.dateDeleted;
  }
}

@injectable()
export class BankQuestionModel implements ModelBase {
  @inject(DbService)
  private readonly dbService!: DbService;

  async find(id: string) {
    return await this.dbService.getItem<BankQuestion>(ENTITY, id);
  }

  async findAll() {
    return await this.dbService.getItems<BankQuestion>(ENTITY);
  }

  async create(data: BankQuestion): Promise<void> {
    await this.dbService.createItem<BankQuestion>(
      new BankQuestionEntity({
        ...data,
        dateCreated: Date.now(),
        dateUpdated: Date.now(),
      })
    );
  }

  async replace(data: BankQuestion): Promise<void> {
    await this.dbService.putItem<BankQuestion>(
      new BankQuestionEntity({
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
