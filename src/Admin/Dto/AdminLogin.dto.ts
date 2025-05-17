import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsEnum, IsNotEmpty, IsString, IsStrongPassword } from "class-validator";
import { AdminUser } from "../admin-user.entity";

export class AdminLoginDto {
  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsStrongPassword()
  password: string;
}