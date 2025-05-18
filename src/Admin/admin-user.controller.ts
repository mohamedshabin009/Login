import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { AdminUserService } from "./admin-user.service";
import { CreateAdminDto } from "./Dto/CreateAdmin.dto";
import { JwtAdminAuthGuard } from "src/Jwt/jwt.guard";

@ApiBearerAuth('Admin')
@UseGuards(JwtAdminAuthGuard)
@ApiTags('ADMIN-USER')
@Controller('admin/users')
export class AdminUserController {
  constructor(
    private readonly adminUserService: AdminUserService,
  ) { }

  @Get('')
  async getAllAdmin() {
    return await this.adminUserService.getAllAdmin();
  }

  @Post('create')
  async createUser(@Body() body: CreateAdminDto) {
    return await this.adminUserService.createAdmin(body);
  }
}