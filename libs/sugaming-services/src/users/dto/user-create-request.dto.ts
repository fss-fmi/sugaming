import { ApiProperty } from '@nestjs/swagger';
import { IsString, Matches, MinLength } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';
import { libConfig } from '../../config/lib.config';
import { UserBaseDto } from './user-base.dto';

export class UserCreateRequestDto extends UserBaseDto {
  @ApiProperty({
    description: 'User password',
    example: 'ExamplePassword123!@#',
  })
  @IsString({
    message: i18nValidationMessage('validation.isString'),
  })
  @MinLength(libConfig.user.password.minLength, {
    message: i18nValidationMessage('validation.minLength'),
  })
  @Matches(libConfig.user.password.regex, {
    message: i18nValidationMessage('validation.matches'),
  })
  password!: string;
}

export default UserCreateRequestDto;
