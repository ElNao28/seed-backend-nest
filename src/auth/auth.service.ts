import { Injectable } from '@nestjs/common';
import { SignUpDto } from './dto/sign-up.dto';

@Injectable()
export class AuthService {
  constructor() {}

  public signUp(signUpDto: SignUpDto) {}
}
