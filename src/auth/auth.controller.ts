import {
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/sign-up.dto';
import { SignInDto } from './dto/sign-in.dto';
import { SuccessfullyLoginDto } from './dto/sign-in-response.dto';
import { GenerateAccessTokenResponseDto } from './dto/generate-access-token-response.dto';
import { GenerateAccessToken } from './dto/generate-access-token.dto';
import { Authorization, ROLES } from './decorators/authorization.decorator';
import { RevokeRefreshTokenDto } from './dto/revoke-refresh-token.dto';
import { RevokedTokenResponseDto } from './dto/revoked-token-response.dto';
import { Public } from 'src/common/decorators/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('sign-in')
  @ApiOkResponse({
    description: 'User login succefully',
    type: SuccessfullyLoginDto,
  })
  public signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto);
  }

  @Public()
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

  @Public()
  @ApiOkResponse({
    description: 'Access token generated',
    type: GenerateAccessTokenResponseDto,
  })
  @Post('generate-access-token')
  public generateAccessToken(@Body() generateAccessToken: GenerateAccessToken) {
    return this.authService.generateRefressTokenByAccess(generateAccessToken);
  }

  @ApiOkResponse({
    description: 'Token is revoked',
    type: RevokedTokenResponseDto,
  })
  @ApiNotFoundResponse({
    description: 'Not found exception',
  })
  @Authorization(ROLES.SuperAdmin)
  @Post('revoke-refresh-token')
  public revokeAccessToken(
    @Body() revokeRefreshTokenDto: RevokeRefreshTokenDto,
  ) {
    return this.authService.revokeRefreshToken(revokeRefreshTokenDto);
  }
}
