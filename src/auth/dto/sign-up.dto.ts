import {
  IsDate,
  IsEmail,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class SignUpDto {
  @IsString()
  name: string;

  @IsString()
  lastname: string;

  @IsString()
  @IsOptional()
  secondLastname?: string;

  @IsDate()
  birthdate: Date;

  @IsString()
  @MinLength(10)
  @MaxLength(10)
  phone: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
