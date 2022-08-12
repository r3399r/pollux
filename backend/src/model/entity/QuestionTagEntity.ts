import { Column, Entity, Generated } from 'typeorm';
import { QuestionTag } from './QuestionTag';

@Entity({ name: 'question_tag' })
export class QuestionTagEntity implements QuestionTag {
  @Column({ primary: true, type: 'bigint' })
  @Generated('rowid')
  id!: string;

  @Column({ type: 'int8', name: 'question_id' })
  questionId!: string;

  @Column({ type: 'int8', name: 'tag_id' })
  tagId!: string;
}
