import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';
import { libConfig } from '../../config/lib.config';
import { UserBaseDto } from './user-base.dto';

export class UserRequestBodyDto extends UserBaseDto {
  @ApiProperty({
    description: 'User password',
    example: 'ParolataNaGosho123',
  })
  @IsString({
    message: i18nValidationMessage('validation.isString'),
  })
  @MinLength(libConfig.user.password.minLength, {
    message: i18nValidationMessage('validation.minLength'),
  })
  password!: string;
}

export default UserRequestBodyDto;
