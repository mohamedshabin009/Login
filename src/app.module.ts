import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { AdminUserModule } from './Admin/admin-user.module';
import { AdminAuthModule } from './Admin/Auth/auth.module';
import * as ormConfig from './orm.configuration'

@Module({
  imports: [TypeOrmModule.forRoot(ormConfig),
    UserModule,
    AuthModule,
    AdminUserModule,
    AdminAuthModule
  ],

  controllers: [],
  providers: [],
})
export class AppModule { }
