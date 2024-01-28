import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CredentialsDto {
  @ApiProperty({
    description: 'Authenticating user email address.',
    example: 'email@example.com',
  })
  @IsEmail()
  email!: string;

  @ApiProperty({
    description: 'Authenticating user password.',
    example: 'ExamplePassword',
  })
  @IsNotEmpty()
  password!: string;
}

export default CredentialsDto;
