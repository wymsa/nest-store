import { Request } from 'express';

export const refreshFromCookieExtractor = (request: Request) => {
  return request.cookies['refreshToken'] || null;
};
