import {
  IsDateString,
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
  Matches,
  MinLength,
} from 'class-validator';
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
    description: 'User password',
    example: 'parolataNaGosho123',
  })
  @IsString()
  @MinLength(3)
  @Matches(/^[a-zA-Z0-9]+$/) // Ensures password has no special characters
  password: string;

  @ApiProperty({
    description: "User's first name.",
    example: 'Gosho',
  })
  @IsNotEmpty()
  @Length(2, 50)
  firstName: string;

  @ApiProperty({
    description: "User's last name.",
    example: 'Losho',
  })
  @IsNotEmpty()
  @Length(2, 50)
  lastName: string;

  @ApiProperty({
    description: "User's in-game nickname",
    example: 'Reomak',
  })
  @IsNotEmpty()
  @Length(2, 50)
  nickname: string;

  @ApiProperty({
    description: 'User creation date',
  })
  @IsDateString()
  createdAt: Date;

  @ApiProperty({
    description: 'User last update date',
  })
  @IsDateString()
  updatedAt: Date;
}

export default UserDto;
