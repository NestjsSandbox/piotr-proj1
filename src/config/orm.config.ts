//* orm.config.ts

import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export default registerAs(
  'my-typeorm-config',
  (): TypeOrmModuleOptions => ({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'postgres',
    database: 'piotr-db',
    autoLoadEntities: true,
    synchronize: true,
  }),
);
