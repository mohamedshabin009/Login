import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { AdminUserService } from "./admin-user.service";
import { CreateAdminDto } from "./Dto/CreateAdmin.dto";
import { JwtAdminAuthGuard } from "src/Jwt/jwt.guard";

@ApiBearerAuth('Admin')
@UseGuards(JwtAdminAuthGuard)
@ApiTags('ADMIN-USER')
@Controller('admin/user')
export class AdminUserController {
  constructor(
    private readonly adminUserService: AdminUserService,
  ) { }

  @Post('create')
  async createUser(@Body() body: CreateAdminDto) {
    return await this.adminUserService.createAdmin(body);
  }
}