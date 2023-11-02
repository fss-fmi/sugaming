import { ApiProperty } from '@nestjs/swagger';

export class TokenDto {
  @ApiProperty({
    description: 'Access token for authenticating users across the platform.',
  })
  accessToken: string;
}

export default TokenDto;
