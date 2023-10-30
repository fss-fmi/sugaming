import { IsEmail, IsNotEmpty } from 'class-validator';

export class CredentialsDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}

export default CredentialsDto;
