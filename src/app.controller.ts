import { Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserModel } from './entity/user.entity';
import { ProfileModel } from './entity/profile.entity';

@Controller()
export class AppController {
  constructor(
    @InjectRepository(UserModel)
    private readonly userRepository: Repository<UserModel>,
    @InjectRepository(ProfileModel)
    private readonly profileRepository: Repository<ProfileModel>,
  ) {}

  @Get('users')
  getUsers() {
    return this.userRepository.find({
      relations: {
        profile: true,
      },
    });
  }

  @Post('users')
  postUsers() {
    return this.userRepository.save({});
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
    });
  }

  @Post('users/profile')
  async createUserAndProfile() {
    const user = await this.userRepository.save({
      email: 'younha00@gmail.com',
    });
    const profile = await this.profileRepository.save({
      profileImg: 'test.img',
      user,
    });
    return user;
  }
}
