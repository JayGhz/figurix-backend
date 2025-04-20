import { forwardRef, Module } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CustomersController } from './customers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from '@/customers/entities/customer.entity';
import { AuthModule } from '@/auth/auth.module';

@Module({
  controllers: [CustomersController],
  providers: [CustomersService],
  imports: [TypeOrmModule.forFeature([Customer]), forwardRef(() => AuthModule)],
  exports: [CustomersService]
})
export class CustomersModule {}
