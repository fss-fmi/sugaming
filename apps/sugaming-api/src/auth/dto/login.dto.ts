import { ApiProperty } from '@nestjs/swagger';
import { Users } from '@prisma/client';

export class LoginDto {
  @ApiProperty({
    description: 'Current user information.',
  })
  user: Omit<Users, 'passwordHash'>;

  @ApiProperty({
    description: 'Access token for authenticating users across the platform.',
  })
  accessToken: string;

  @ApiProperty({
    description: 'Refresh token for re-authenticating users.',
  })
  refreshToken: string;

  @ApiProperty({
    description: 'Timestamp of access token expiration.',
  })
  expiresIn: number;
}

export default LoginDto;
