import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'root@123',
    database: 'login',
    entities: [join(__dirname, '**/*.entity{.ts,.js}')],
    synchronize: true,
  }), UserModule, AuthModule,],

  controllers: [],
  providers: [],
})
export class AppModule { }
