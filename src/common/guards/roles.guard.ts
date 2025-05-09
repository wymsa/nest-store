import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { REQUIRED_ROLES_KEY } from '../decorators/required-roles.decorator';
import { Role } from '@prisma/client';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(REQUIRED_ROLES_KEY, [
      context.getHandler()
    ]);

    if (!requiredRoles) return true;
    if (!request.user) return false;

    const isAvailable = requiredRoles.includes(request.user.role);

    console.log(request.user, requiredRoles, isAvailable);

    if (!isAvailable) return false;
    return true;
  }
}
