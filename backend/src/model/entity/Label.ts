import {
  DbBase,
  DbService,
  entity,
  ModelBase,
  primaryAttribute,
  relatedAttributeOne,
} from '@y-celestial/service';
import { inject, injectable } from 'inversify';

export const ENTITY = 'label';

export type Label = DbBase & {
  id: string;
  label: string;
  ownerId: string;
};

/**
 * Entity class for Label
 */
@entity(ENTITY)
class LabelEntity implements Label {
  @primaryAttribute()
  public id: string;
  public label: string;
  @relatedAttributeOne('user')
  public ownerId: string;

  public dateCreated?: number;
  public dateUpdated?: number;
  public dateDeleted?: number;

  constructor(input: Label) {
    this.id = input.id;
    this.label = input.label;
    this.ownerId = input.ownerId;
    this.dateCreated = input.dateCreated;
    this.dateUpdated = input.dateUpdated;
    this.dateDeleted = input.dateDeleted;
  }
}

@injectable()
export class LabelModel implements ModelBase {
  @inject(DbService)
  private readonly dbService!: DbService;

  async find(id: string) {
    return await this.dbService.getItem<Label>(ENTITY, id);
  }

  async findAll() {
    return await this.dbService.getItems<Label>(ENTITY);
  }

  async findAllByOwner(userId: string) {
    return await this.dbService.getItemsByIndex<Label>(ENTITY, 'user', userId);
  }

  async create(data: Label): Promise<void> {
    await this.dbService.createItem<Label>(
      new LabelEntity({
        ...data,
        dateCreated: Date.now(),
        dateUpdated: Date.now(),
      })
    );
  }

  async replace(data: Label): Promise<void> {
    await this.dbService.putItem<Label>(
      new LabelEntity({
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
