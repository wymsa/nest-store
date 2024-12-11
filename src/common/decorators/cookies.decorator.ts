import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { Request } from "express";

export const Cookies = createParamDecorator(
  (data: string | string[], ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<Request>();
    const cookies = request.cookies;

    if (!data) return cookies;

    const keys = Array.isArray(data) ? data : [data];

    const filteredCookies = keys.reduce(
      (acc, key) => {
        if (cookies[key]) {
          acc[key] = cookies[key];
          return acc;
        }
      },
      {} as Record<string, string>,
    );
    return filteredCookies;
  },
);
