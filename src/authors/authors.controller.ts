import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthorsService } from './authors.service';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { Auth } from '@/auth/decorators/auth.decorator';
import { Role } from '@/shared/enums/role.enum';

@Auth(Role.ADMIN)
@Controller('authors')
export class AuthorsController {
  constructor(private readonly authorsService: AuthorsService) {}

  @Get()
  findAll() {
    return this.authorsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.authorsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateAuthorDto: UpdateAuthorDto) {
    return this.authorsService.update(+id, updateAuthorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.authorsService.remove(+id);
  }
}
