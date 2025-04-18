import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_ROOT_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      synchronize: true,
      ssl: process.env.DB_SSL === 'true',
      extra: {
        ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : null,
      }
    })
  ],

  controllers: [],
  providers: [],
})
export class AppModule { }
