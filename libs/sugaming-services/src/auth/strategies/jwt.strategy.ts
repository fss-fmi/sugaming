import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import { libConfig } from '../../config/lib.config';
import { UsersService } from '../../users/users.service';
import { JwtContentsDto } from '../dto/jwt-contents.dto';

type CookieExtractorRequest = Request & {
  cookies: {
    access_token: string;
  };
};

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly usersService: UsersService) {
    const cookieExtractor = (req: CookieExtractorRequest) => {
      let token = null;
      if (req && req.cookies) token = req.cookies.access_token;
      return token;
    };

    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        ExtractJwt.fromAuthHeaderAsBearerToken(),
        ExtractJwt.fromUrlQueryParameter('access_token'),
        cookieExtractor,
      ]),
      ignoreExpiration: false,
      secretOrKey: libConfig.jwtAccessToken.secret,
    });
  }

  async validate(payload: JwtContentsDto) {
    return this.usersService.getByEmail(payload.email);
  }
}

export default JwtStrategy;
