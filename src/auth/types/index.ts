import { User } from '@prisma/client';

export type JwtPayload = {
  email: string;
  sub: number;
};

export type PrismaUser = Omit<User, 'password'>;
