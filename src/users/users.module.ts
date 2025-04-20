import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@/users/entities/user.entity';
import { CustomersModule } from '@/customers/customers.module';
import { AuthorsModule } from '@/authors/authors.module';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [TypeOrmModule.forFeature([User]), CustomersModule, AuthorsModule],
  exports: [UsersService],
})
export class UsersModule {}
