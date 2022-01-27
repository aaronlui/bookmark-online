import { Injectable } from '@nestjs/common';
import { UserRepository } from 'src/repository/user.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(createUserDto: CreateUserDto) {
    const { username, email, password } = createUserDto;

    const existUser = await this.findByUsername(username);
    if (existUser) return null;

    const user = new User();
    user.username = username;
    user.email = email;
    user.password = password;
    user.createdTime = new Date().toISOString();
    user.isActive = true;
    user.isAdmin = false;

    return this.userRepository.save(user);
  }

  async findAll() {
    return this.userRepository.find();
  }

  async findOne(id: number) {
    return this.userRepository.findOne(id);
  }

  async findByUsername(username: string) {
    return this.userRepository.findOne({ where: { username } });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const { username, password, email } = updateUserDto;
    const existUser = await this.findOne(id);
    // BUG: 处理密码
    return this.userRepository.update(
      { id },
      {
        username: username || existUser.username,
        password: password || existUser.password,
        email: email || existUser.email,
      },
    );
  }

  async remove(id: number) {
    return this.userRepository.delete({ id });
  }

  async checkIsAdmin(id: number) {
    return this.userRepository.findOne({ where: { id, isAdmin: true } });
  }

  async checkIsActive(id: number) {
    return this.userRepository.findOne({ where: { id, isActive: true } });
  }
}
