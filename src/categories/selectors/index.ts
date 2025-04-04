import { Prisma } from '@prisma/client';

export const defaultCategorySelector: Prisma.CategorySelect = {
  id: true,
  name: true,
  slug: true
};
