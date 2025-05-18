import { Controller, Body, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './Dto/UpdateUserDto.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtUserAuthGuard } from 'src/Jwt/jwt.guard';

@ApiBearerAuth('User')
@UseGuards(JwtUserAuthGuard)
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
