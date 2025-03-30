import { User } from '@prisma/client';

export type PrismaUser = Omit<User, 'password'>;
