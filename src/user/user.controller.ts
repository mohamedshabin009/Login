import { Controller, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { SignUp } from '../auth/dto/signup.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  // @Post()
  // create(@Body() createUserDto: CreateUserDto) {
  //   return this.userService.create(createUserDto);
  // }

}
