import { IsNotEmpty, IsEmail } from 'class-validator';

export class Memberdto {

  @IsEmail()
  email: string;

  @IsNotEmpty()
  name: string;
}
