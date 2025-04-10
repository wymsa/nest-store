import { SetMetadata } from '@nestjs/common';

export const PUBLIC_ROUTE_KEY = 'public_router';
export const PublicRoute = () => SetMetadata(PUBLIC_ROUTE_KEY, true);
