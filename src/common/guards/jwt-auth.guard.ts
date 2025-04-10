import { ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';
import { PUBLIC_ROUTE_KEY } from '../decorators/public-router.decorator';

export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private readonly reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const isPublicRoute = this.reflector.getAllAndOverride(PUBLIC_ROUTE_KEY, [context.getHandler()]);

    if (isPublicRoute) {
      return true;
    }

    return super.canActivate(context);
  }
}
