import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength, MinLength } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';
import { UserBaseDto } from './user-base.dto';
import { appConfig } from '../../app/app.config';

export class UserRequestBodyDto extends UserBaseDto {
  @ApiProperty({
    description: 'User password',
    example: 'ParolataNaGosho123',
  })
  @IsString({
    message: i18nValidationMessage('validation.isString'),
  })
  @MinLength(appConfig.user.password.minLength, {
    message: i18nValidationMessage('validation.minLength'),
  })
  @MaxLength(appConfig.user.password.maxLength, {
    message: i18nValidationMessage('validation.maxLength'),
  })
  password: string;
}

export default UserRequestBodyDto;
