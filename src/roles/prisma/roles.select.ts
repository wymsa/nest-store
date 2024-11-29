import { Prisma } from '@prisma/client';

export const roleDefaultSelect: Prisma.RoleSelect = {
  id: true,
  name: true,
};
