import { PasswordService } from '@/shared/password/password.service';
import { Module } from '@nestjs/common';

@Module({
  providers: [PasswordService],
  exports: [PasswordService],
})
export class SharedModule {}
