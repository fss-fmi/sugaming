import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { i18nValidationMessage } from 'nestjs-i18n';
import { libConfig } from '../../config/lib.config';

export class UserBaseDto {
  @ApiProperty({
    description: "User's first name.",
    example: 'Гошо',
  })
  @IsNotEmpty({
    message: i18nValidationMessage('validation.isNotEmpty'),
  })
  @MinLength(libConfig.user.firstName.minLength, {
    message: i18nValidationMessage('validation.minLength'),
  })
  @MaxLength(libConfig.user.firstName.maxLength, {
    message: i18nValidationMessage('validation.maxLength'),
  })
  @Matches(libConfig.user.firstName.regex, {
    message: i18nValidationMessage('validation.matches'),
  })
  firstName!: string;

  @ApiProperty({
    description: "User's last name.",
    example: 'Лошо',
  })
  @IsNotEmpty({
    message: i18nValidationMessage('validation.isNotEmpty'),
  })
  @MinLength(libConfig.user.lastName.minLength, {
    message: i18nValidationMessage('validation.minLength'),
  })
  @MaxLength(libConfig.user.lastName.maxLength, {
    message: i18nValidationMessage('validation.maxLength'),
  })
  @Matches(libConfig.user.lastName.regex, {
    message: i18nValidationMessage('validation.matches'),
  })
  lastName!: string;

  @ApiProperty({
    description: "User's in-game nickname.",
    example: 'Reomak',
  })
  @IsNotEmpty({
    message: i18nValidationMessage('validation.isNotEmpty'),
  })
  @MinLength(libConfig.user.nickname.minLength, {
    message: i18nValidationMessage('validation.minLength'),
  })
  @MaxLength(libConfig.user.nickname.maxLength, {
    message: i18nValidationMessage('validation.maxLength'),
  })
  @Matches(libConfig.user.nickname.regex, {
    message: i18nValidationMessage('validation.matches'),
  })
  nickname!: string;

  @ApiProperty({
    description: 'User email address.',
    example: 'email@example.com',
  })
  @IsNotEmpty({
    message: i18nValidationMessage('validation.isNotEmpty'),
  })
  @IsEmail({}, { message: i18nValidationMessage('validation.isEmail') })
  email!: string;

  @ApiProperty({
    description: 'User phone number.',
    example: '+359880080085',
  })
  @IsNotEmpty({
    message: i18nValidationMessage('validation.isNotEmpty'),
  })
  @Matches(libConfig.user.phone.regex, {
    message: i18nValidationMessage('validation.matches'),
  })
  phone!: string;

  @ApiProperty({
    description: 'User university major.',
    example: 'Компютърни науки',
  })
  @IsNotEmpty({
    message: i18nValidationMessage('validation.isNotEmpty'),
  })
  @MinLength(libConfig.user.universityMajor.minLength, {
    message: i18nValidationMessage('validation.minLength'),
  })
  @MaxLength(libConfig.user.universityMajor.maxLength, {
    message: i18nValidationMessage('validation.maxLength'),
  })
  @Matches(libConfig.user.universityMajor.regex, {
    message: i18nValidationMessage('validation.matches'),
  })
  universityMajor!: string;

  @ApiProperty({
    description: 'User university degree.',
    example: 'BACHELOR',
  })
  @IsNotEmpty({
    message: i18nValidationMessage('validation.isNotEmpty'),
  })
  @IsEnum(libConfig.user.universityDegree.enum, {
    message: i18nValidationMessage('validation.isEnum', {
      enum: Object.values(libConfig.user.universityDegree.enum).join(', '),
    }),
  })
  universityDegree!: 'BACHELOR' | 'MASTER' | 'DOCTORATE';

  @ApiProperty({
    description: 'User university year.',
    example: 'FIRST',
  })
  @IsNotEmpty({
    message: i18nValidationMessage('validation.isNotEmpty'),
  })
  @IsEnum(libConfig.user.universityYear.enum, {
    message: i18nValidationMessage('validation.isEnum', {
      enum: Object.values(libConfig.user.universityYear.enum).join(', '),
    }),
  })
  universityYear!: 'FIRST' | 'SECOND' | 'THIRD' | 'FOURTH';

  @ApiProperty({
    description: 'User university faculty number.',
    example: '0MI123456',
  })
  @IsNotEmpty({
    message: i18nValidationMessage('validation.isNotEmpty'),
  })
  @MinLength(libConfig.user.universityFacultyNumber.minLength, {
    message: i18nValidationMessage('validation.minLength'),
  })
  @MaxLength(libConfig.user.universityFacultyNumber.maxLength, {
    message: i18nValidationMessage('validation.maxLength'),
  })
  @Matches(libConfig.user.universityFacultyNumber.regex, {
    message: i18nValidationMessage('validation.matches'),
  })
  universityFacultyNumber!: string;

  @ApiProperty({
    type: 'array',
    items: {
      type: 'string',
      format: 'binary',
    },
    required: true,
    description: 'User university proof images.',
  })
  universityProofImages!: Array<Express.Multer.File>;
}

export default UserBaseDto;
