import { Column, Entity, Generated } from 'typeorm';
import { BankQuestion } from './BankQuestion';

@Entity({ name: 'bank_question' })
export class BankQuestionEntity implements BankQuestion {
  @Column({ primary: true, type: 'bigint' })
  @Generated('rowid')
  id!: string;

  @Column({ type: 'int8', name: 'bank_id' })
  bankId!: string;

  @Column({ type: 'int8', name: 'question_id' })
  questionId!: string;
}
