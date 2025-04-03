import { Body, Controller, Get, HttpCode, HttpStatus, Post, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { RequiredRoles } from 'src/common/decorators/required-roles.decorator';
import { SignUpDTO } from './dtos/sign-up.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post('signup')
  async signUp(@Body() signUpDto: SignUpDTO) {
    return await this.authService.signUp(signUpDto);
  }

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

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @RequiredRoles('ADMIN')
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
