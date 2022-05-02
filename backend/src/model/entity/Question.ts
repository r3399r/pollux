import {
  DbBase,
  DbService,
  entity,
  ModelBase,
  primaryAttribute,
  relatedAttributeOne,
} from '@y-celestial/service';
import { inject, injectable } from 'inversify';
import { Type } from 'src/constant/Question';

export const ENTITY = 'question';

export type Question = DbBase & {
  id: string;
  labelId: string;
  type: Type;
  question: string;
  answer?: string;
  ownerId: string;
};

/**
 * Entity class for Question
 */
@entity(ENTITY)
class QuestionEntity implements Question {
  @primaryAttribute()
  public id: string;
  @relatedAttributeOne('label')
  public labelId: string;
  public type: Type;
  public question: string;
  public answer?: string;
  @relatedAttributeOne('user')
  public ownerId: string;

  public dateCreated?: number;
  public dateUpdated?: number;
  public dateDeleted?: number;

  constructor(input: Question) {
    this.id = input.id;
    this.labelId = input.labelId;
    this.type = input.type;
    this.question = input.question;
    this.answer = input.answer;
    this.ownerId = input.ownerId;
    this.dateCreated = input.dateCreated;
    this.dateUpdated = input.dateUpdated;
    this.dateDeleted = input.dateDeleted;
  }
}

@injectable()
export class QuestionModel implements ModelBase {
  @inject(DbService)
  private readonly dbService!: DbService;

  async find(id: string) {
    return await this.dbService.getItem<Question>(ENTITY, id);
  }

  async findAll() {
    return await this.dbService.getItems<Question>(ENTITY);
  }

  async findAllByLabel(labelId: string) {
    return await this.dbService.getItemsByIndex<Question>(
      ENTITY,
      'label',
      labelId
    );
  }

  async create(data: Question): Promise<void> {
    await this.dbService.createItem<Question>(
      new QuestionEntity({
        ...data,
        dateCreated: Date.now(),
        dateUpdated: Date.now(),
      })
    );
  }

  async replace(data: Question): Promise<void> {
    await this.dbService.putItem<Question>(
      new QuestionEntity({
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
