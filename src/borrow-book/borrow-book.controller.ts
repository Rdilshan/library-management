import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { BorrowBookService } from './borrow-book.service';
import { BorrowBookDto } from './dto/BorrowBook';

@Controller('borrow-book')
export class BorrowBookController {
  constructor(private readonly borrowBookService: BorrowBookService) {}

  @Post()
  create(@Body() borrowbook: BorrowBookDto) {
    return this.borrowBookService.create(borrowbook);
  }

  @Get()
  findAll() {
    return this.borrowBookService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.borrowBookService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() BorrowBook: BorrowBookDto) {
    return this.borrowBookService.update(id, BorrowBook);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.borrowBookService.remove(id);
  }
}
