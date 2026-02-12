import {
  BadRequestException,
  ConflictException,
  HttpStatus,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { SignUpDto } from './dto/sign-up.dto';
import { SignInDto } from './dto/sign-in.dto';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { In, Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JWTConfig } from 'src/configuration/config/interfaces/jwt-config.interface';
import { SuccessfullyLoginDto } from './dto/sign-in-response.dto';
import { BcryptConfig } from '../configuration/config/interfaces/bcrypt-config.interface';
import { Role } from './entities/role.entity';
import { JwtAccessPaylodDto } from './dto/jwt-payload.dto';
import { GenerateAccessToken } from './dto/generate-access-token.dto';
import { RefreshToken } from './entities/refreshToken.entity';
import { RevokeRefreshTokenDto } from './dto/revoke-refresh-token.dto';
import { handleDatabaseErrors } from 'src/common/helpers/handler-db-error.helper';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Role) private readonly roleRepository: Repository<Role>,
    @InjectRepository(RefreshToken)
    private readonly refreshTokenRepository: Repository<RefreshToken>,
    private readonly jwtService: JwtService,
    private readonly envService: ConfigService,
  ) {}

  public async signIn(signInDto: SignInDto): Promise<SuccessfullyLoginDto> {
    const { email, password } = signInDto;

    const foundUser = await this.userRepository.findOne({
      where: {
        email,
      },
      relations: ['roles'],
      select: {
        id: true,
        password: true,
        email: true,
        roles: {
          name: true,
          id: true,
        },
      },
    });

    if (!foundUser) throw new UnauthorizedException();

    const valid = await bcrypt.compare(password, foundUser.password);

    if (!valid) throw new UnauthorizedException();

    const payload = {
      accessToken: this.generateAccessToken(foundUser),
      refreshToken: this.generateRefreshToken(foundUser),
    };

    await this.saveRefreshToken(payload.refreshToken, foundUser);

    return payload;
  }

  public async signUp(signUpDto: SignUpDto) {
    const { email, phone, password, roles: idsRoles, ...restUser } = signUpDto;
    const foundUser = await this.userRepository.findOne({
      where: [{ email }, { phone }],
    });

    if (foundUser) {
      throw new ConflictException();
    }

    const { ROUNDS_HASH } = this.envService.get<BcryptConfig>('bcrypt')!;
    const passHash = bcrypt.hashSync(password, +ROUNDS_HASH);

    try {
      const roles = await this.roleRepository.findBy({
        id: In(idsRoles ?? [3]),
      });

      const newUser = this.userRepository.create({
        email,
        phone,
        password: passHash,
        roles,
        ...restUser,
      });
      return await this.userRepository.save(newUser);
    } catch (error) {
      handleDatabaseErrors(error);
    }
  }

  public async generateRefressTokenByAccess(
    generateAccessToken: GenerateAccessToken,
  ) {
    const { refreshToken } = generateAccessToken;
    const { SECRET_KEY_REFRESH_TOKEN } = this.envService.get<JWTConfig>('jwt')!;
    let jwtData;

    try {
      jwtData = await this.jwtService.verify(refreshToken, {
        secret: SECRET_KEY_REFRESH_TOKEN,
      });
    } catch (error) {
      handleDatabaseErrors(error);
    }

    const tokens = await this.refreshTokenRepository.find({
      where: {
        user: {
          id: jwtData.sub,
        },
      },
    });

    for (const token of tokens) {
      const isMatch = await bcrypt.compare(refreshToken, token.tokenHash);
      if (isMatch && token.revoked) throw new UnauthorizedException();
    }

    const userFound = await this.userRepository.findOne({
      where: {
        id: jwtData.sub,
      },
      relations: ['roles'],
      select: {
        roles: {
          name: true,
          id: true,
        },
      },
    });

    if (!userFound) throw new UnauthorizedException();

    const accessToken = this.generateAccessToken(userFound);

    return {
      accessToken,
    };
  }

  public generateRefreshToken(user: User): string {
    const { EXPIRATION_TIME_REFRESH, SECRET_KEY_REFRESH_TOKEN } =
      this.envService.get<JWTConfig>('jwt')!;

    const payload = {
      sub: user.id,
    };

    const refreshToken = this.jwtService.sign(payload, {
      secret: SECRET_KEY_REFRESH_TOKEN,
      expiresIn: EXPIRATION_TIME_REFRESH as any,
    });

    return refreshToken;
  }

  public generateAccessToken(user: User): string {
    const { SECRET_KEY_ACCESS_TOKEN, EXPIRATION_TIME_ACCESS } =
      this.envService.get<JWTConfig>('jwt')!;

    const payload: JwtAccessPaylodDto = {
      sub: user.id,
      email: user.email,
      roles: user.roles,
    };

    const accessToken = this.jwtService.sign(payload, {
      secret: SECRET_KEY_ACCESS_TOKEN,
      expiresIn: EXPIRATION_TIME_ACCESS as any,
    });

    return accessToken;
  }

  public async saveRefreshToken(token: string, user: User) {
    try {
      const { ROUNDS_TOKEN_HASH } =
        this.envService.get<BcryptConfig>('bcrypt')!;

      const tokenHash = bcrypt.hashSync(token, +ROUNDS_TOKEN_HASH);

      const newRefreshToken = this.refreshTokenRepository.create({
        tokenHash,
        user,
      });

      await this.refreshTokenRepository.save(newRefreshToken);
    } catch (error) {
      handleDatabaseErrors(error);
    }
  }

  public async revokeRefreshToken(
    revokeRefreshTokenDto: RevokeRefreshTokenDto,
  ) {
    const { oldToken, userId } = revokeRefreshTokenDto;
    const tokens = await this.refreshTokenRepository.find({
      where: {
        revoked: false,
        user: {
          id: userId,
        },
      },
    });

    if (tokens.length === 0) throw new NotFoundException();

    for (const token of tokens) {
      const isHash = await bcrypt.compare(oldToken, token.tokenHash);
      if (isHash) {
        this.refreshTokenRepository.update(token.id, { revoked: true });
        return {
          message: 'Token is revoked',
          status: HttpStatus.OK,
        };
      }
    }
  }
}
