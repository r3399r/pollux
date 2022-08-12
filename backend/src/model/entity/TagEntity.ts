import { BeforeInsert, BeforeUpdate, Column, Entity, Generated } from 'typeorm';
import { Tag } from './Tag';

@Entity({ name: 'tag' })
export class TagEntity implements Tag {
  @Column({ primary: true, type: 'bigint' })
  @Generated('rowid')
  id!: string;

  @Column({ type: 'text' })
  name!: string;

  @Column({ type: 'text', name: 'user_id' })
  userId!: string;

  @Column({ type: 'timestamp', name: 'date_created', default: null })
  dateCreated!: Date;

  @Column({ type: 'timestamp', name: 'date_updated', default: null })
  dateUpdated: Date | null = null;

  @BeforeInsert()
  setDateCreated(): void {
    this.dateCreated = new Date();
  }

  @BeforeUpdate()
  setDateUpdated(): void {
    this.dateUpdated = new Date();
  }
}