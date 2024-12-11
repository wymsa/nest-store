import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Res,
  UseGuards,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { SignInDto } from "./dtos/sign-in.dto";
import { Response } from "express";
import { Cookies } from "src/common/decorators/cookies.decorator";
import { JwtAuthGuard } from "src/common/guards/jwt-auth.guard";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post("/signIn")
  async signIn(
    @Body() signInDto: SignInDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { email, password } = signInDto;
    const { user, accessToken, refreshToken } = await this.authService.signIn(
      email,
      password,
    );

    res.cookie("refreshToken", refreshToken, { httpOnly: true });

    return { user, accessToken };
  }

  @Get("/test")
  @UseGuards(JwtAuthGuard)
  async test() {
    return "Protected Route";
  }

  @HttpCode(HttpStatus.OK)
  @Get("/refresh")
  async refreshTokens(
    @Cookies("refreshToken") { refreshToken }: Record<string, string>,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { accessToken, refreshToken: newRefreshToken } =
      await this.authService.refreshTokens(refreshToken);

    res.cookie("refreshToken", newRefreshToken, { httpOnly: true });
    return { accessToken };
  }
}
