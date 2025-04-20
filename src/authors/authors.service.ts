import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Author } from '@/authors/entities/author.entity';
import { AuthorDetailsDto } from '@/authors/dto/author-details.dto';

@Injectable()
export class AuthorsService {

  constructor(@InjectRepository(Author) private authorRepository: Repository<Author>) { }

  async create(createAuthorDto: CreateAuthorDto): Promise<Author> {
    const author = this.authorRepository.create(createAuthorDto);
    return await this.authorRepository.save(author);
  }

  async findAll(): Promise<AuthorDetailsDto[]> {
    return await this.authorRepository.find();
  }

  async findOne(id: number): Promise<Author> {
    const authorExists = await this.authorRepository.findOneBy({ id });
    if (!authorExists) {
      throw new BadRequestException(`Does not exist author with id: ${id}`);
    }
    return authorExists;
  }

  async update(id: number, updateAuthorDto: UpdateAuthorDto) {
    const authorExists = await this.authorRepository.findOneBy({ id });
    if (!authorExists) {
      throw new BadRequestException(`Does not exist author with id: ${id}`);
    }
    return await this.authorRepository.update({ id }, updateAuthorDto);
  }

  async remove(id: number) {
    const authorExists = await this.authorRepository.findOneBy({ id });
    if (!authorExists) {
      throw new BadRequestException(`Does not exist author with id: ${id}`);
    }
    return await this.authorRepository.delete({ id });
  }
}
