import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserModel } from './user.entity';

@Entity()
export class ProfileModel {
  @PrimaryGeneratedColumn()
  id: number;

  @JoinColumn()
  @OneToOne(() => UserModel, (user) => user.profile)
  user: UserModel;

  @Column()
  profileImg: string;
}
