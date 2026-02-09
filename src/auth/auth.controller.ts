import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/sign-up.dto';
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { User } from './entities/user.entity';
import { SignInDto } from './dto/sign-in.dto';
import { SuccessfullyLoginDto } from './dto/successfully-login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-in')
  @ApiOkResponse({
    description: 'User login succefully',
    type: SuccessfullyLoginDto,
  })
  public signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto);
  }

  @Post('sign-up')
  @ApiCreatedResponse({ description: 'User created', type: User })
  public signUp(@Body() signUpDto: SignUpDto) {
    return this.authService.signUp(signUpDto);
  }
}
