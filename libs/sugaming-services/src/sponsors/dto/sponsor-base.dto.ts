import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { i18nValidationMessage } from 'nestjs-i18n';

export class SponsorBaseDto {
  @ApiProperty({
    description: 'Sponsor name',
    example: 'Sponsor name',
  })
  @IsNotEmpty({
    message: i18nValidationMessage('validation.isNotEmpty'),
  })
  name!: string;

  @ApiProperty({
    description: 'Sponsor description',
    example: 'Sponsor description',
  })
  @IsNotEmpty({
    message: i18nValidationMessage('validation.isNotEmpty'),
  })
  description!: string;

  @ApiProperty({
    description: 'Sponsor color',
    example: 'Sponsor color',
  })
  @IsNotEmpty({
    message: i18nValidationMessage('validation.isNotEmpty'),
  })
  color!: string;

  @ApiProperty({
    description: 'Sponsor image',
    example: 'Sponsor image',
  })
  @IsNotEmpty({
    message: i18nValidationMessage('validation.isNotEmpty'),
  })
  image!: string;

  @ApiProperty({
    description: 'Sponsor link',
    example: 'Sponsor link',
  })
  @IsNotEmpty({
    message: i18nValidationMessage('validation.isNotEmpty'),
  })
  link!: string;
}

export default SponsorBaseDto;
