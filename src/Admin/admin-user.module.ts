import { Module } from "@nestjs/common";
import { AdminUser } from "./admin-user.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AdminUserController } from "./admin-user.controller";
import { AdminUserService } from "./admin-user.service";

@Module({
  imports: [TypeOrmModule.forFeature([AdminUser])],
  controllers: [AdminUserController],
  providers: [AdminUserService],
  exports: [AdminUserService]
})

export class AdminUserModule { }