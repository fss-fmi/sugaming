import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty({
    description: 'User id.',
    example: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',
  })
  @IsNotEmpty()
  id: string;

  @ApiProperty({
    description: 'User email address.',
    example: 'email@example.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: "User's first name.",
    example: 'Gosho',
  })
  firstName: string;

  @ApiProperty({
    description: "User's last name.",
    example: 'Losho',
  })
  lastName: string;

  @ApiProperty({
    description: "User's in-game nickname",
    example: 'Reomak',
  })
  nickname: string;

  @ApiProperty({
    description: 'User creation date',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'User last update date',
  })
  updatedAt: Date;
}

export default UserDto;
