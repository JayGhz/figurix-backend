import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CustomersService } from '@/customers/customers.service';
import { AuthorsService } from '@/authors/authors.service';
import { User } from '@/users/entities/user.entity';
import { Role } from '@/shared/enums/role.enum';
import { userProfileDto } from '@/users/dto/user-profile.dto';
import { plainToInstance } from 'class-transformer';
import { CustomerDetailsDto } from '@/customers/dto/customer-details.dto';
import { UserDetailsDto } from '@/users/dto/user-details.dto';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private customerService: CustomersService,
    private authorService: AuthorsService,
  ) { }

  async create(createUserDto: CreateUserDto, role: Role): Promise<User> {
    const userExists = await this.userRepository.findOneBy({ email: createUserDto.email });
    if (userExists) {
      throw new BadRequestException('User with this email already exists');
    }
    const user = this.userRepository.create({ ...createUserDto, role });
    return await this.userRepository.save(user);
  }

  async registerCustomer(createUserDto: CreateUserDto): Promise<userProfileDto> {
    const user = await this.create(createUserDto, Role.CUSTOMER);
    return plainToInstance(userProfileDto, {
      userName: user.userName,
      email: user.email,
      role: user.role,
      customerDetails: plainToInstance(CustomerDetailsDto, user.customer),
    });
  }

  async registerAuthor(createUserDto: CreateUserDto): Promise<userProfileDto> {
    const user = await this.create(createUserDto, Role.AUTHOR);
    return plainToInstance(userProfileDto, {
      userName: user.userName,
      email: user.email,
      role: user.role,
      authorDetails: plainToInstance(CustomerDetailsDto, user.author),
    });
  }

  async findAll(): Promise<UserDetailsDto[]> {
    const users = await this.userRepository.find();
    return plainToInstance(UserDetailsDto, users, { excludeExtraneousValues: true, groups: ['userDetails'] });
  }

  async findOne(id: number): Promise<UserDetailsDto> {
    const userExists = await this.userRepository.findOneBy({ id });
    if (!userExists) {
      throw new NotFoundException(`Does not exist a user with id: ${id}`);
    }

    return plainToInstance(UserDetailsDto, userExists, { excludeExtraneousValues: true });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const userExists = await this.userRepository.findOneBy({ id });
    if (!userExists) {
      throw new NotFoundException(`Does not exist a user with id: ${id}`);
    }

    await this.userRepository.update({ id }, updateUserDto);

    return { message: 'User updated successfully' };
  }

  async remove(id: number) {
    const userExists = await this.userRepository.findOne({ where: { id }, relations: ['customer', 'author'] });

    if (!userExists) {
      throw new NotFoundException(`Does not exist a user with id: ${id}`);
    }
    if (userExists.customer) {
      await this.customerService.remove(userExists.customer.id);
    }
    if (userExists.author) {
      await this.authorService.remove(userExists.author.id);
    }

    await this.userRepository.remove(userExists);

    return { message: 'User deleted successfully' };

  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOneBy({ email });
    return user;
  }

  async getProfile(email: string): Promise<userProfileDto> {
    const user = await this.userRepository.findOne({ where: { email }, relations: ['customer', 'author'] });

    if (!user) {
      throw new NotFoundException(`Does not exist a user with email: ${email}`);
    }

    return plainToInstance(userProfileDto, {
      userName: user.userName,
      email: user.email,
      role: user.role,
      customerDetails: user.customer ? plainToInstance(CustomerDetailsDto, user.customer) : undefined,
      authorDetails: user.author ? plainToInstance(CustomerDetailsDto, user.author) : undefined,
    });
  }
}
