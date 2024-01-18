import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { i18nValidationMessage } from 'nestjs-i18n';
import { appConfig } from '../../app/app.config';

export class UserBaseDto {
  @ApiProperty({
    description: 'User email address.',
    example: 'email@example.com',
  })
  @IsEmail({}, { message: i18nValidationMessage('validation.isEmail') })
  email: string;

  @ApiProperty({
    description: "User's first name.",
    example: 'Gosho',
  })
  @IsNotEmpty({
    message: i18nValidationMessage('validation.isNotEmpty'),
  })
  @MinLength(appConfig.user.firstName.minLength, {
    message: i18nValidationMessage('validation.minLength'),
  })
  @MaxLength(appConfig.user.firstName.maxLength, {
    message: i18nValidationMessage('validation.maxLength'),
  })
  firstName: string;

  @ApiProperty({
    description: "User's last name.",
    example: 'Losho',
  })
  @IsNotEmpty({
    message: i18nValidationMessage('validation.isNotEmpty'),
  })
  @MinLength(appConfig.user.lastName.minLength, {
    message: i18nValidationMessage('validation.minLength'),
  })
  @MaxLength(appConfig.user.lastName.maxLength, {
    message: i18nValidationMessage('validation.maxLength'),
  })
  lastName: string;

  @ApiProperty({
    description: "User's in-game nickname",
    example: 'Reomak',
  })
  @IsNotEmpty({
    message: i18nValidationMessage('validation.isNotEmpty'),
  })
  @MinLength(appConfig.user.nickname.minLength, {
    message: i18nValidationMessage('validation.minLength'),
  })
  @MaxLength(appConfig.user.nickname.maxLength, {
    message: i18nValidationMessage('validation.maxLength'),
  })
  nickname: string;
}

export default UserBaseDto;
