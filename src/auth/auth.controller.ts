import { Controller, Get, HttpCode, HttpStatus, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';
import { PrismaUser } from 'src/users/types';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Res({ passthrough: true }) response: Response, @CurrentUser() currentUser: Express.User) {
    const { accessToken, refreshToken } = await this.authService.login(currentUser);

    response.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60 * 1000
    });

    return accessToken;
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  @HttpCode(HttpStatus.OK)
  async profile(@CurrentUser() currentUser: Express.User) {
    return currentUser;
  }

  @UseGuards(AuthGuard('refresh-jwt'))
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  async refresh(@Res({ passthrough: true }) response: Response, @CurrentUser() currentUser: Express.User) {
    const { accessToken, refreshToken } = await this.authService.login(currentUser);

    response.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60 * 1000
    });

    return accessToken;
  }
}
