import { Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserModel } from './entity/user.entity';
import { ProfileModel } from './entity/profile.entity';
import { PostModel } from './entity/post.entity';
import { TagModel } from './entity/tag.entity';

@Controller()
export class AppController {
  constructor(
    @InjectRepository(UserModel)
    private readonly userRepository: Repository<UserModel>,
    @InjectRepository(ProfileModel)
    private readonly profileRepository: Repository<ProfileModel>,
    @InjectRepository(PostModel)
    private readonly postRepository: Repository<PostModel>,
    @InjectRepository(TagModel)
    private readonly tagRepository: Repository<TagModel>,
  ) {}

  @Get('users')
  getUsers() {
    return this.userRepository.find({
      // 어떤 프로퍼티를 가져올지 선택할 수 있다.
      // 기본값은 모든 프로퍼티를 가져온다.
      // 만약에 select 옵션을 사용하지 않으면 모든 프로퍼티를 가져온다.
      select: {
        id: true,
        email: true,
        createdAt: false,
        version: true,
        profile: {
          id: true,
        },
      },
      // where 옵션은 조건을 걸 수 있다.
      // email이 'younha0012@gmail'인 데이터를 찾는다.
      // 만약 빈 객체를 넣으면 모든 데이터를 가져온다.
      // 그냥 쉼표로 구분하면 and 조건이를.
      // or 조건을 사용하고 싶다면 리스트를 사용한다.
      where: [
        {
          id: 3,
        },
        {
          version: 1,
        },
        {
          profile: {
            profileImg: 'test.img',
          },
        },
      ],
      // 관계를 가져오는 법
      relations: {
        profile: true,
      },
      // 오름차순 내림차순
      // 'ASC' | 'DESC'
      order: {
        id: 'DESC',
        profile: {
          id: 'ASC',
        },
      },
      // skip은 처음 몇 개를 제외하고 가져올지
      skip: 0,
      // take는 몇 개를 가져올지
      // 기본값은 0, 전체를 가져온다.
      take: 2,
    });
  }

  @Post('users')
  postUsers() {
    return this.userRepository.save({
      email: 'test123@naver.com',
    });
  }

  @Patch('users/:id')
  async patchUsers(@Param('id') id: string) {
    const user = await this.userRepository.findOne({
      where: {
        id: parseInt(id),
      },
    });
    return this.userRepository.save({
      ...user,
      email: user.email + '0',
    });
  }

  @Delete('user/profile/:id')
  async deleteProfile(@Param('id') id: string) {
    await this.profileRepository.delete(+id);
  }

  @Post('user/profile')
  async createUserAndProfile() {
    const user = await this.userRepository.save({
      email: 'younha0012@gmail.com',
      profile: {
        profileImg: 'test1.img',
      },
    });
    // const profile = await this.profileRepository.save({
    //   profileImg: 'test.img',
    //   user,
    // });
    return user;
  }

  @Post('user/post')
  async createUserAndPost() {
    const user = await this.userRepository.save({
      email: 'younha00@naver.com',
    });
    await this.postRepository.save({
      author: user,
      title: 'test1',
    });

    await this.postRepository.save({
      author: user,
      title: 'test2',
    });
    return user;
  }

  @Post('posts/tags')
  async createPostsTags() {
    const post1 = await this.postRepository.save({
      title: 'NestJS 강의',
    });
    const post2 = await this.postRepository.save({
      title: 'TypeORM 강의',
    });
    const tag1 = await this.tagRepository.save({
      name: 'Javascript',
      posts: [post1, post2],
    });
    const tag2 = await this.tagRepository.save({
      name: 'Flutter',
      posts: [post1],
    });
    await this.postRepository.save({
      title: 'Flutter 강의',
      tags: [tag1, tag2],
    });
    return true;
  }

  @Get('posts')
  async getPosts() {
    return this.postRepository.find({
      relations: ['tags'],
    });
  }

  @Get('tags')
  async getTags() {
    return this.tagRepository.find({
      relations: {
        posts: true,
      },
    });
  }
}
