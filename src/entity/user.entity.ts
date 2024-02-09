import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';

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

  // 제목
  @Column({
    // 데이터베이스에서 인지하는 칼럼 타입
    // 자동으로 유추됨.
    type: 'varchar',
    // 칼럼 이름
    // 프로퍼티 이름과 같은 이름으로 설정됨.
    name: 'title',
    // 입력할 수 있는 값의 길이
    length: 100,
    // null 허용 여부
    nullable: true,
    // true면 처음에 저장할 때만 값 지정 가능
    // 이후에는 값 변경 불가능
    update: false,
    // find()할 때 기본으로 값을 불러오는지
    // 기본값은 true
    select: false,
    // 기본값
    // 아무것도 입력하지 않았을 때 기본값으로 들어감
    default: 'default title',
    // 칼럼중에서 유일한 값이 되어야 하는지
    unique: true,
  })
  title: string;

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
}
