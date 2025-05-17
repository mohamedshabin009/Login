import { Module } from "@nestjs/common";
import { AdminUserModule } from "../admin-user.module";
import { AdminAuthService } from "./auth.service";
import { AdminAuthController } from "./auth.controller";
import { JwtModule } from "@nestjs/jwt";

@Module({
  imports: [JwtModule.register({
    secret: 'admin-secret',
    signOptions: { expiresIn: '1d' }
  }),
    AdminUserModule],
  controllers: [AdminAuthController],
  providers: [AdminAuthService],
  exports: [AdminAuthService]
})


export class AdminAuthModule { }