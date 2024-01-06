import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { I18nContext } from 'nestjs-i18n';
import { appConfig } from '../../app/app.config';
import { AuthUnauthorizedException } from '../exceptions/auth-unauthorized.exception';

@Injectable()
export class JwtRefreshGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const i18n = I18nContext.current();
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new AuthUnauthorizedException();
    }

    try {
      request.user = this.jwtService.verify(token, appConfig.jwtRefreshToken);
    } catch {
      throw new AuthUnauthorizedException();
    }

    return true;
  }

  private extractTokenFromHeader(request: Request) {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Refresh' ? token : undefined;
  }
}

export default JwtRefreshGuard;
