import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy as JwtPassportStrategy } from 'passport-jwt';
import { AuthService } from '../auth.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtPayload } from '../types';

@Injectable()
export class JwtStrategy extends PassportStrategy(JwtPassportStrategy) {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.getOrThrow<string>('JWT_SECRET'),
      ignoreExpiration: false
    });
  }

  async validate(payload: JwtPayload) {
    const foundUser = await this.authService.validateUserEmail(payload.email);

    console.log(payload);

    if (!foundUser) {
      throw new UnauthorizedException();
    }

    return foundUser;
  }
}
