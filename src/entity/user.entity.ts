import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';
import { ProfileModel } from './profile.entity';
import { PostModel } from './post.entity';

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
  // save()가 몇 번 불렸는지 기억한다.
  @VersionColumn()
  version: number;

  @Column()
  @Generated('uuid')
  additionalId: string;

  @JoinColumn()
  @OneToOne(() => ProfileModel, (profile) => profile.user, {
    // find()를 실행할 때마다 항상 같이 가져온다.
    eager: false,
    // repository로 저장할 때 relation을 한 번에 같이 저장 가능
    cascade: true,
    // nullable의 기본값은 true
    nullable: true,
    // 관계가 삭제했을 때(여기서는 profileModel이 삭제될 때) 어떻게 할 것인가
    // 1. no action => 아무것도 하지 않는다.
    // 2. cascade => 참조하는 Row도 같이 삭제한다.
    // 3. set null => 참조하는 Row에서 참조 id를 null로 바꾼다.
    // 4. set default => 기본 세팅으로 설정(테이블의 기본 세팅)
    // 5. restrict => 참조하는 Row가 있으면 참조당하는 Row 삭제 불가
    onDelete: 'SET NULL',
  })
  profile: ProfileModel;

  @OneToMany(() => PostModel, (post) => post.author)
  posts: PostModel[];

  @Column({
    default: 0,
  })
  count: number;
}
