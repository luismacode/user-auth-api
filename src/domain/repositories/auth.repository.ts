import { type SigninUserDTO } from '../dtos/auth/signin-user.dto';
import type { SignupUserDTO } from '../dtos/auth/signup-user.dto';
import type { UserEntity } from '../entities/user.entity';

export abstract class AuthRepository {
    abstract signup(signupUserDTO: SignupUserDTO): Promise<UserEntity>;
    abstract signin(signinUserDTO: SigninUserDTO): Promise<UserEntity>;
}
