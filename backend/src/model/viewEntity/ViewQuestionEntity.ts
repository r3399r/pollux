import { ViewColumn, ViewEntity } from 'typeorm';
import { ViewQuestion } from './ViewQuestion';

@ViewEntity({ name: 'v_question' })
export class ViewQuestionEntity implements ViewQuestion {
  @ViewColumn()
  id!: string;

  @ViewColumn()
  content!: string;

  @ViewColumn()
  answer: string | null = null;

  @ViewColumn()
  solution: string | null = null;

  @ViewColumn({ name: 'user_id' })
  userId!: string;

  @ViewColumn({ name: 'tag_id' })
  tagId: string | null = null;

  @ViewColumn({ name: 'date_created' })
  dateCreated!: Date;

  @ViewColumn({ name: 'date_updated' })
  dateUpdated: Date | null = null;
}
