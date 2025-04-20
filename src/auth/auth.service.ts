import { SignInDto } from '@/auth/dto/sign-in.dto';
import { PasswordService } from '@/shared/password/password.service';
import { CreateUserDto } from '@/users/dto/create-user.dto';
import { userProfileDto } from '@/users/dto/user-profile.dto';
import { UsersService } from '@/users/users.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UsersService,
    private readonly passwordService: PasswordService,
  ) { }

  async signIn(signInDto: SignInDto): Promise<{ accessToken: string }> {

    const { email, password } = signInDto;
    const user = await this.userService.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await this.passwordService.comparePassword(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { id:user.id, email: user.email, role: user.role };
    const accessToken = await this.jwtService.signAsync(payload);

    return { accessToken };
  }

  async registerCustomer(createUserDto: CreateUserDto): Promise<userProfileDto> {
    const hashedPassword = await this.passwordService.hashPassword(createUserDto.password);
    createUserDto.password = hashedPassword;
    return await this.userService.registerCustomer(createUserDto);
  }

  async registerAuthor(createUserDto: CreateUserDto): Promise<userProfileDto> {
    const hashedPassword = await this.passwordService.hashPassword(createUserDto.password);
    createUserDto.password = hashedPassword;
    return await this.userService.registerAuthor(createUserDto);
  }

  async getProfile(email: string): Promise<userProfileDto> {
    return await this.userService.getProfile(email);
  }
}
