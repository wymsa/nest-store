import { Prisma } from '@prisma/client';

export const defaultUserSelector: Prisma.UserSelect = {
  id: true,
  email: true,
  role: true
};

export const withPasswordUserSelector: Prisma.UserSelect = {
  ...defaultUserSelector,
  password: true
};
