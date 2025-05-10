import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { LogIn } from './dto/logIn.dto';
import { SignUp } from 'src/auth/dto/signup.dto';
import { JwtService } from '@nestjs/jwt';

export interface Payload {
  email?: string;
  sub: string;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) { }

  async signUp(body: SignUp) {
    return await this.userService.create(body);
  }
  async signIn(body: LogIn) {
    const user = await this.userService.logIn(body);
    const access_token = this.generateAccessToken(user.email, user.id)
    const verify_token = this.generateRefreshToken(user.id)

    return {
      Success: true,
      message: 'Login successfully',
      user,
      access_token,
      verify_token
    }
  }

  private generateAccessToken(email: string, sub: string) {
    const payload: Payload = {
      email,
      sub
    }

    const token = this.jwtService.sign(payload, {
      secret: 'secret_access_token',
      expiresIn: '1h'
    })
    return token
  }

  private generateRefreshToken(sub: string) {
    const payload: Payload = {
      sub
    }
    const token = this.jwtService.sign(payload, {
      secret: 'secret_refresh_token',
      expiresIn: '7d'
    })
    return token
  }

  async verifyToken(refreshToken: string) {
    try {
      const token = await this.jwtService.verify(refreshToken, { secret: 'secret_refresh_token' })
      if (!token) throw new UnauthorizedException() // not working and TODO:proper error handling
      const user = await this.userService.findUserById(token.sub)
      const access_token = this.generateAccessToken(user.email, user.id)
      const refresh_token = this.generateRefreshToken(user.id)
      return { access_token, refresh_token }

    } catch (error) {
      throw new BadRequestException(error)
    }
  }
}
