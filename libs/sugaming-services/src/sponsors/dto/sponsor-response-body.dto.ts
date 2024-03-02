import { IsDateString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { i18nValidationMessage } from 'nestjs-i18n';
import { SponsorBaseDto } from './sponsor-base.dto';

export class SponsorResponseBodyDto extends SponsorBaseDto {
  @ApiProperty({
    description: 'Sponsor id.',
    example: 1,
  })
  @IsNotEmpty({
    message: i18nValidationMessage('validation.isNotEmpty'),
  })
  id!: 1;

  @ApiProperty({
    description: 'Sponsor creation date',
  })
  @IsDateString(
    {},
    {
      message: i18nValidationMessage('validation.isDateString'),
    },
  )
  createdAt!: Date;

  @ApiProperty({
    description: 'Sponsor last update date',
  })
  @IsDateString(
    {},
    { message: i18nValidationMessage('validation.isDateString') },
  )
  updatedAt!: Date;
}

export default SponsorResponseBodyDto;
