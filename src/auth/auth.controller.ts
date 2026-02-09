import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/sign-up.dto';
import {
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import { SignInDto } from './dto/sign-in.dto';
import { SuccessfullyLoginDto } from './dto/successfully-login.dto';
import { SignUpSuccessDto } from './dto/sign-up-success.dto';
import { BaseResponse } from 'src/common/utils/base-response';

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
  @ApiCreatedResponse({
    description: 'User created',
    type: SignUpSuccessDto,
  })
  @ApiConflictResponse({
    type: BaseResponse,
  })
  public signUp(@Body() signUpDto: SignUpDto) {
    return this.authService.signUp(signUpDto);
  }
}
