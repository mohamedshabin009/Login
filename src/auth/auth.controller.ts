import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LogIn } from './dto/logIn.dto';
import { SignUp } from 'src/auth/dto/signup.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('AUTH')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('signUp')
  async signUp(@Body() body: SignUp) {
    return await this.authService.signUp(body);
  }

  @Post('logIn')
  async signIn(@Body() body: LogIn) {
    return await this.authService.signIn(body);
  }
  @Post('verifyToken/:token')
  async verifyToken(@Param('token') param: string) {
    return await this.authService.verifyToken(param);
  }

}
