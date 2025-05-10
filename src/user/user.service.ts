import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { SignUp } from '../auth/dto/signup.dto';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { LogIn } from 'src/auth/dto/logIn.dto';
import { verifyPassword } from 'src/util';
import { FindOneByEmail } from './interfaces/user.interface';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userModel: Repository<User>,
  ) { }
  async create(body: SignUp) {
    try {
      const user = await this.userModel.findOne({
        where: { email: body.email },
      });

      if (user) {
        throw new BadRequestException('User already exist');
      }
      const createUser = this.userModel.create(body);
      await this.userModel.save(createUser);
      return {
        Success: true,
        message: 'User created successfully'
      };

    } catch (error) {
      throw new BadRequestException(error)
    }
  }

  async logIn(body: LogIn) {
    try {
      const user = await this.userModel.findOne({
        where: { email: body.email },
      });
      if (!user || !verifyPassword(body.password, user.password)) {
        throw new UnauthorizedException('Email or Password wrong');
      }

      const { password, ...userData } = user;
      return userData

    } catch (error) {
      throw new BadRequestException(error)
    }
  }

  async findOneByEmail(body: FindOneByEmail) {
    const user = await this.userModel.findOne({
      where: { email: body.email }, select: ['id', 'password']
    });
    return { user }
  }
  async findUserById(id: string) {
    const user = await this.userModel.findOne({
      where: { id }
    });
    if (!user) throw new BadRequestException('User not found')
    return user
  }
}
