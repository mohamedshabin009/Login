import { Body, Controller, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { AdminUserService } from "./admin-user.service";
import { CreateAdminDto } from "./Dto/CreateAdmin.dto";

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