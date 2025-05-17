import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsEnum, IsNotEmpty, IsPhoneNumber, IsString, IsStrongPassword } from "class-validator"
import { AdminRole } from "../Enum/admin.enum"

export class CreateAdminDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string

  @ApiProperty()
  @IsString()
  @IsStrongPassword()
  @IsNotEmpty()
  password: string

  @ApiProperty()
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string

  @ApiProperty()
  @IsString()
  @IsPhoneNumber()
  @IsNotEmpty()
  mobile_number: string

  @ApiProperty()
  @IsString()
  @IsEnum(AdminRole)
  @IsNotEmpty()
  role: string
}