import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/sign-up.dto';
import {
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { SignInDto } from './dto/sign-in.dto';
import { SuccessfullyLoginDto } from './dto/sign-in-response.dto';
import { GenerateAccessTokenResponseDto } from './dto/generate-access-token-response.dto';
import { GenerateAccessToken } from './dto/generate-access-token.dto';

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
  })
  @ApiConflictResponse({
    description: 'Conflict',
  })
  public signUp(@Body() signUpDto: SignUpDto) {
    return this.authService.signUp(signUpDto);
  }

  @ApiOkResponse({
    description: 'Access token generated',
    type: GenerateAccessTokenResponseDto,
  })
  @Post('refresh')
  public generateAccessToken(@Body() refressTokenDto: GenerateAccessToken) {
    return this.authService.generateRefressTokenByAccess(refressTokenDto);
  }
}
