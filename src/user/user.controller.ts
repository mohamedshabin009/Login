import { Controller, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { SignUp } from '../auth/dto/signup.dto';
import { UpdateUserDto } from './Dto/UpdateUserDto.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('USER')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Put(':id')
  async updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return await this.userService.updateUser(id, body);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    return await this.userService.deleteUser(id);
  }

}
