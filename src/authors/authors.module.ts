import { forwardRef, Module } from '@nestjs/common';
import { AuthorsService } from './authors.service';
import { AuthorsController } from './authors.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Author } from '@/authors/entities/author.entity';
import { AuthModule } from '@/auth/auth.module';

@Module({
  controllers: [AuthorsController],
  providers: [AuthorsService],
  imports: [TypeOrmModule.forFeature([Author]), forwardRef(() => AuthModule)],
  exports: [AuthorsService],
})
export class AuthorsModule {}
