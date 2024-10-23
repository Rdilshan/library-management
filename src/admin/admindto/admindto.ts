import { IsNotEmpty, IsEmail } from 'class-validator';

export class AdminDTO {
  @IsNotEmpty()
  username: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  name: string;
}
