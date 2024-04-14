import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Color } from '@prisma/client';
import { i18nValidationMessage } from 'nestjs-i18n';
import { libConfig } from '../../../config/lib.config';

export class Cs2TeamMemberDto {
  @ApiProperty({
    description: 'User id.',
    example: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',
  })
  id!: string;

  @ApiProperty({
    description: "User's first name.",
    example: 'Гошо',
  })
  firstName!: string;

  @ApiProperty({
    description: "User's last name.",
    example: 'Лошо',
  })
  lastName!: string;

  @ApiProperty({
    description: "User's in-game nickname.",
    example: 'Reomak',
  })
  nickname!: string;

  @ApiProperty({
    description: 'User avatar url.',
    example: 'https://api.sugaming.club/api/v1/users/avatars/example.svg',
  })
  avatarUrl!: string;
}
