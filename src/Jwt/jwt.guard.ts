import { Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class JwtAdminAuthGuard extends AuthGuard('Admin') { }

@Injectable()
export class JwtUserAuthGuard extends AuthGuard('User') { }