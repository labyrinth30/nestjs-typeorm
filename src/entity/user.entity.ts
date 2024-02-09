import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';
import { ProfileModel } from './profile.entity';

export enum Role {
  ADMIN = 'admin',
  USER = 'user',
}

@Entity()
export class UserModel {
  // ID
  // @PrimaryGeneratedColumn()
  // @PrimaryColumn() 은 모든 테이블에서 기본적으로 존재해야한다.
  // 테이블 안에서 각각의 Row를 구분할 수 있는 Column이다.
  // PrimaryGeneratedColumn은 순서대로 위로 올라가는 값
  // 1,2,3,4,5
  // uuid -> jjadklfjsadfeioajldkjf1231321jkewjfdk12332
  // 절대로 겹치지 않음
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.USER,
  })
  role: Role;

  // 데이터 생성 일자
  // 데이터가 생성되는 날짜와 시간이 자동으로 찍힌다.
  @CreateDateColumn()
  createdAt: Date;

  // 데이터 업데이트 일자
  // 데이터가 업데이트 날짜와 시간이 자동으로 찍힌다.
  @UpdateDateColumn()
  updatedAt: Date;

  // Version
  // 데이터가 업데이트 될 때마다 1씩 올라간다.
  // 처음 생성되는 값은 1이다.
  // save()가 몇 번 불렸는지 기억한다.ㄴ
  @VersionColumn()
  version: number;

  @Column()
  @Generated('uuid')
  additionalId: string;

  @OneToOne(() => ProfileModel, (profile) => profile.user)
  profile: ProfileModel;
}
