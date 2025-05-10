import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString, IsStrongPassword } from "class-validator";

export class SignUp {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsString()
  @IsStrongPassword()
  @IsNotEmpty()
  password: string;

  @ApiProperty()
  @IsString()
  @IsPhoneNumber()
  @IsNotEmpty()
  mobile_number: string;
}