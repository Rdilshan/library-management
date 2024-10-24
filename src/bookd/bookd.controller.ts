import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BookdService } from './bookd.service';
import { BookDto } from './dto/book';

@Controller('bookd')
export class BookdController {
  constructor(private readonly bookdService: BookdService) {}
  
  @Get()
  findAll() {
    return this.bookdService.findAll();
  }

  @Post()
  create(@Body() book: BookDto) {
    return this.bookdService.create(book);
  }


  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.bookdService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() book: BookDto) {
    return this.bookdService.update(id, book);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.bookdService.remove(id);
  }
}
