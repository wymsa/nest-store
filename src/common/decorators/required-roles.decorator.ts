import { SetMetadata } from '@nestjs/common';
import { Role } from '@prisma/client';

export const REQUIRED_ROLES_KEY = 'roles';

export const RequiredRoles = (...roles: Role[]) => SetMetadata(REQUIRED_ROLES_KEY, roles);
