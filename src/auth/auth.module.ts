import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AuthGuard } from '@/auth/guards/auth.guard';
import { RoleGuard } from '@/auth/guards/role.guard';
import { JwtModule } from '@nestjs/jwt';
import { SharedModule } from '@/shared/shared.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from '@/users/users.module';

@Module({
  controllers: [AuthController],
  providers: [AuthService, AuthGuard, RoleGuard],
  imports: [
    SharedModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        global: true,
        signOptions: { expiresIn: '1d' },
      }),
      inject: [ConfigService],
    }),
    forwardRef(() => UsersModule),
  ],

  exports: [AuthService, AuthGuard, RoleGuard, JwtModule],
})
export class AuthModule { }
