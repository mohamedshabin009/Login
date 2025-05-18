import { join } from "path";

module.exports = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'root@123',
  database: 'login',
  entities: [join(__dirname, '**/*.entity{.ts,.js}')],
  synchronize: true,
  logging: true,
}  // TODO: env configuration