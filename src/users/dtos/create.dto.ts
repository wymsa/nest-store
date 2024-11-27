import { Prisma } from '@prisma/client';
import { IsEmail, IsString } from 'class-validator';

export class CreateUserDto
  implements Omit<Prisma.UserCreateInput, 'createAt, updatedAt'>
{
  @IsEmail()
  email: string;
  @IsString()
  password: string;
}
