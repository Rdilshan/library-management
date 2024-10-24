import { IsNotEmpty, IsEmail } from 'class-validator';

export class BorrowBookDto {
  @IsNotEmpty()
  bookId: number;

  @IsNotEmpty()
  userId: number;

  @IsNotEmpty()
  bringDate: Date;

  @IsNotEmpty()
  endDate: Date;
}
