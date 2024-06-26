import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { i18nValidationMessage } from 'nestjs-i18n';
import { SponsorBaseDto } from './sponsor-base.dto';

export class SponsorDto extends SponsorBaseDto {
  @ApiProperty({
    description: 'Sponsor id.',
    example: 1,
  })
  @IsNotEmpty({
    message: i18nValidationMessage('validation.isNotEmpty'),
  })
  id!: number;

  @ApiProperty({
    description: 'Sponsor creation date.',
  })
  createdAt!: Date;

  @ApiProperty({
    description: 'Sponsor last update date.',
  })
  updatedAt!: Date;
}

export default SponsorDto;
