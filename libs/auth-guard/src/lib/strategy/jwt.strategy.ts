import { UserService } from '@myexperiment/infrastructure';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'SECRET_KEY',
    });
  }

  async validate(payload: any) {
    let user = await this.userService.getUserById(payload.id);
    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
