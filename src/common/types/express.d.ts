import { PrismaUser } from 'src/users/types';

declare global {
  namespace Express {
    interface User extends PrismaUser {}
  }
}
