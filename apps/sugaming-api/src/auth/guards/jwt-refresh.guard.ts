import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { I18nContext } from 'nestjs-i18n';
import { appConfig } from '../../app/app.config';

@Injectable()
export class JwtRefreshGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const i18n = I18nContext.current();
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException(i18n.t('errors.auth.unauthorized'));
    }

    try {
      request.user = this.jwtService.verify(token, appConfig.jwtRefreshToken);
    } catch {
      throw new UnauthorizedException(i18n.t('errors.auth.unauthorized'));
    }

    return true;
  }

  private extractTokenFromHeader(request: Request) {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Refresh' ? token : undefined;
  }
}

export default JwtRefreshGuard;
