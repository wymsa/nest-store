import { RoleEntity } from '../../roles/entities/role.entity';
import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @ManyToMany(() => RoleEntity, (roleEntity) => roleEntity.users, { cascade: true })
  @JoinTable({
    name: 'users_roles',
    joinColumn: { referencedColumnName: 'id', name: 'user_id' },
    inverseJoinColumn: { referencedColumnName: 'id', name: 'role_id' },
  })
  roles: RoleEntity[];
}
