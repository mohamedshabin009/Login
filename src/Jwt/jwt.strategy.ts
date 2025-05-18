import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from 'passport-jwt'
import { AdminAuthService } from "src/Admin/Auth/auth.service";
import { AuthService } from "src/auth/auth.service";

@Injectable()
export class JwtUserStrategy extends PassportStrategy(Strategy, 'User') {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'secret_access_token'
    });
  }

  async validate(payload: any) {
    const user = await this.authService.findUser(payload.sub);
    if (!user) throw new UnauthorizedException();
    return user;
  }
}

@Injectable()

export class JwtAdminStrategy extends PassportStrategy(Strategy, 'Admin') {
  constructor(private readonly adminAuthService: AdminAuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'admin-secret'
    })
  }
  async validate(payload: any) {
    const admin = await this.adminAuthService.findAdmin(payload.sub);
    if (!admin) throw new UnauthorizedException();
    return admin;
  }
}