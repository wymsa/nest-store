import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy as JwtPassportStrategy } from 'passport-jwt';
import { JwtPayload, PrismaUser } from '../types';
import { refreshFromCookieExtractor } from '../extractors/refresh-from-cookie.extractor';
import { ConfigService } from '@nestjs/config';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class RefreshJwtStrategy extends PassportStrategy(
  JwtPassportStrategy,
  'refresh-jwt'
) {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([refreshFromCookieExtractor]),
      secretOrKey: configService.getOrThrow<string>('JWT_SECRET'),
      ignoreExpiration: false
    });
  }

  async validate(payload: JwtPayload): Promise<PrismaUser> {
    const foundUser = await this.authService.validateUser(payload.email);

    console.log(payload);

    if (!foundUser) {
      throw new UnauthorizedException();
    }

    return foundUser;
  }
}
