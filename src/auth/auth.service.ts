import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload, PrismaUser } from './types';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) {}

  async validateUser(userEmail: string): Promise<PrismaUser | null>;
  async validateUser(userEmail: string, userPassword: string): Promise<PrismaUser | null>;

  async validateUser(userEmail: string, userPassword?: string): Promise<PrismaUser | null> {
    const foundUser = await this.usersService.getOneByEmail(userEmail);

    if (!foundUser) return null;

    if (userPassword) {
      const isValidPassword = await compare(userPassword, foundUser.password);

      if (!isValidPassword) return null;
    }

    const { password, ...restFoundUser } = foundUser;
    return restFoundUser;
  }

  async login(user: PrismaUser) {
    const payload = { email: user.email, sub: user.id } as JwtPayload;

    return await this.issueTokens(payload);
  }

  private async issueTokens(payload: JwtPayload) {
    // 15m
    const accessToken = await this.jwtService.signAsync(payload, {
      expiresIn: 15 * 60
    });

    // 30d
    const refreshToken = await this.jwtService.signAsync(payload, {
      expiresIn: 30 * 24 * 60 * 60
    });

    return { accessToken, refreshToken };
  }
}
