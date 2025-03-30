import { PassportStrategy } from '@nestjs/passport';
import { Strategy as LocalPassportStrategy } from 'passport-local';
import { AuthService } from '../auth.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaUser } from 'src/users/types';

@Injectable()
export class LocalStrategy extends PassportStrategy(LocalPassportStrategy) {
  constructor(private readonly authService: AuthService) {
    super({
      session: false,
      usernameField: 'email',
      passwordField: 'password'
    });
  }

  async validate(userEmail: string, userPassword: string): Promise<PrismaUser> {
    const foundUser = await this.authService.validateUser(userEmail, userPassword);

    if (!foundUser) {
      throw new UnauthorizedException();
    }

    return foundUser;
  }
}
