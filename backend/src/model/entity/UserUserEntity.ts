import { Column, Entity, Generated } from 'typeorm';
import { UserUser } from './UserUser';

@Entity({ name: 'user_user' })
export class UserUserEntity implements UserUser {
  @Column({ primary: true, type: 'bigint' })
  @Generated('rowid')
  id!: string;

  @Column({ type: 'text', name: 'src_user_id' })
  srcUserId!: string;

  @Column({ type: 'text', name: 'dst_user_id' })
  dstUserId!: string;

  @Column({ type: 'text' })
  nickname!: string;
}
