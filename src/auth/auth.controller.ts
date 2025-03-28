import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';
import { PrismaUser } from './types';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response
  ) {
    const { accessToken, refreshToken } = await this.authService.login(
      <PrismaUser>request.user
    );

    response.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60 * 1000
    });

    return accessToken;
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  @HttpCode(HttpStatus.OK)
  async profile(@Req() request: Request) {
    return request.user;
  }

  @UseGuards(AuthGuard('refresh-jwt'))
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  async refresh(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response
  ) {
    const { accessToken, refreshToken } = await this.authService.login(
      <PrismaUser>request.user
    );

    response.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60 * 1000
    });

    return accessToken;
  }
}
