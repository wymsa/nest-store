import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { HashingService } from "src/common/services/hashing.service";
import { UsersService } from "src/users/users.service";

@Injectable()
export class AuthService {
  private readonly accessTokenExpiresIn = "1m";
  private readonly refreshTokenExpiresIn = "7d";

  constructor(
    private readonly userService: UsersService,
    private readonly hashService: HashingService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(email: string, pwrd: string) {
    const foundUser = await this.userService.getOneByEmail(email);
    const isMatch = await this.hashService.compare(pwrd, foundUser.password);

    if (!isMatch) {
      throw new BadRequestException("Invalid credentials");
    }

    const payload = { sub: foundUser.id, email: foundUser.email };
    const { accessToken, refreshToken } = await this.issueTokens(payload);

    const { password, ...returningUser } = foundUser;

    return { user: returningUser, accessToken, refreshToken };
  }

  async refreshTokens(refreshToken: string) {
    try {
      const payload = await this.verifyTokenExcludeExpData(refreshToken);

      console.log("payload", payload);
      const tokens = await this.issueTokens(payload);
      return { ...tokens };
    } catch {
      throw new UnauthorizedException();
    }
  }

  async issueTokens(payload: Record<string, any>) {
    const accessToken = await this.jwtService.signAsync(payload, {
      expiresIn: this.accessTokenExpiresIn,
    });

    const refreshToken = await this.jwtService.signAsync(payload, {
      expiresIn: this.refreshTokenExpiresIn,
    });

    return { accessToken, refreshToken };
  }

  async verifyTokenExcludeExpData(token: string) {
    const { iat, exp, ...payload } = await this.jwtService.verifyAsync(token, {
      complete: false,
    });
    return payload;
  }
}
