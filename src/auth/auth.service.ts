import {
  BadRequestException,
  ConflictException,
  Injectable,
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

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Role) private readonly roleRepository: Repository<Role>,
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
        roles: {
          name: true,
          id: true,
        },
      },
    });

    if (!foundUser) throw new UnauthorizedException();

    const valid = await bcrypt.compare(password, foundUser.password);

    if (!valid) throw new UnauthorizedException();

    return {
      accessToken: this.generateAccessToken(foundUser),
      refreshToken: this.generateRefreshToken(foundUser),
    };
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
      console.log(error);
      throw new BadRequestException();
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
      throw new UnauthorizedException();
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
}
