import { BadRequestException, Injectable, OnModuleInit, UnauthorizedException } from "@nestjs/common";
import { AdminUserService } from "../admin-user.service";
import { AdminLoginDto } from "../Dto/AdminLogin.dto";
import { verifyPassword } from "src/util";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AdminAuthService implements OnModuleInit {
  constructor(
    private readonly adminUserService: AdminUserService,
    private readonly jwtService: JwtService
  ) { }

  async onModuleInit() {
    const admin = await this.adminUserService.findSuperAdmin()
    if (admin === 0) {
      await this.adminUserService.createSuperAdmin()
    }
  }

  async findAdmin(id: string) {
    return await this.adminUserService.findAdmin(id)
  }

  async logIn(body: AdminLoginDto) {
    try {
      const admin = await this.adminUserService.logIn(body)

      const payload = {
        name: admin.name,
        sub: admin.id
      }

      const token = this.jwtService.sign(payload)

      return {
        success: true,
        token
      }

    } catch (error) {
      throw new BadRequestException(error)
    }
  }
}