import { BeforeInsert, BeforeUpdate, Column, Entity, Generated } from 'typeorm';
import { Question } from 'src/model/entity/Question';

@Entity({ name: 'question' })
export class QuestionEntity implements Question {
  @Column({ primary: true, type: 'bigint' })
  @Generated('rowid')
  id!: string;

  @Column({ type: 'text' })
  content!: string;

  @Column({ type: 'text', default: null })
  answer: string | null = null;

  @Column({ type: 'text', default: null })
  solution: string | null = null;

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
