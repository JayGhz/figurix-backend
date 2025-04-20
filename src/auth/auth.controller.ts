import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from '@/auth/dto/sign-in.dto';
import { CreateUserDto } from '@/users/dto/create-user.dto';
import { Auth } from '@/auth/decorators/auth.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sig-in')
  signIn(@Body() signInDto: SignInDto): Promise<{ accessToken: string }> {
    return this.authService.signIn(signInDto);
  }

  @Post('register-customer')
  registerCustomer(@Body() createUserDto: CreateUserDto) {
    return this.authService.registerCustomer(createUserDto);
  }

  @Post('register-author')
  registerAuthor(@Body() createUserDto: CreateUserDto) {
    return this.authService.registerAuthor(createUserDto);
  }

  @Auth()
  @Get('profile')
  getProfile(@Req() req) {
    const {email} = req.user.email;
    return this.authService.getProfile(email);
  }
}
