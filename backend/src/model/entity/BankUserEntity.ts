import { Column, Entity, Generated } from 'typeorm';
import { BankUser } from './BankUser';

@Entity({ name: 'bank_user' })
export class BankUserEntity implements BankUser {
  @Column({ primary: true, type: 'bigint' })
  @Generated('rowid')
  id!: string;

  @Column({ type: 'int8', name: 'bank_id' })
  bankId!: string;

  @Column({ type: 'text', name: 'user_id' })
  userId!: string;
}
