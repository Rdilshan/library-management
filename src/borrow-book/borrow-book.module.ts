import { Module } from '@nestjs/common';
import { BorrowBookService } from './borrow-book.service';
import { BorrowBookController } from './borrow-book.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports:[DatabaseModule],
  controllers: [BorrowBookController],
  providers: [BorrowBookService],
})
export class BorrowBookModule {}
