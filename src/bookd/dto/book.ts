import { IsNotEmpty, IsEmail } from 'class-validator';

export class BookDto {
  @IsNotEmpty()
  Author: string;

  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  year: Date;

}
