import { Body, Controller, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { AdminLoginDto } from "../Dto/AdminLogin.dto";
import { AdminAuthService } from "./auth.service";

@ApiTags('ADMIN-AUTH')
@Controller('admin')
export class AdminAuthController {
  constructor(
    private readonly authService: AdminAuthService,
  ) { }

  @Post('LogIn')
  async logIn(@Body() body: AdminLoginDto) {
    return await this.authService.logIn(body);
  }
}