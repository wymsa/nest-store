import { Prisma } from '@prisma/client';

export const userDefaultSelect: Prisma.UserSelect = {
  id: true,
  email: true,
};

export const userWithRoleSelect: Prisma.UserSelect = {
  ...userDefaultSelect,
  role: {
    select: {
      name: true,
    },
  },
};
