import { ViewColumn, ViewEntity } from 'typeorm';
import { Type } from 'src/constant/Question';
import { ViewQuestion } from './ViewQuestion';

@ViewEntity({ name: 'v_question' })
export class ViewQuestionEntity implements ViewQuestion {
  @ViewColumn()
  id!: string;

  @ViewColumn()
  type!: Type;

  @ViewColumn()
  content!: string;

  @ViewColumn()
  answer: string | null = null;

  @ViewColumn({ name: 'user_id' })
  userId!: string;

  @ViewColumn({ name: 'date_created' })
  dateCreated!: Date;

  @ViewColumn({ name: 'date_updated' })
  dateUpdated: Date | null = null;

  @ViewColumn()
  tag: string[] | null = null;
}
