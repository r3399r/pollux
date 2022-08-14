import { ViewColumn, ViewEntity } from 'typeorm';
import { ViewBank } from './ViewBank';

@ViewEntity({ name: 'v_bank' })
export class ViewBankEntity implements ViewBank {
  @ViewColumn()
  id!: string;

  @ViewColumn()
  name!: string;

  @ViewColumn({ name: 'user_id' })
  userId!: string;

  @ViewColumn({ name: 'question_count' })
  questionCount!: number;

  @ViewColumn({ name: 'date_created' })
  dateCreated!: Date;

  @ViewColumn({ name: 'date_updated' })
  dateUpdated: Date | null = null;
}
