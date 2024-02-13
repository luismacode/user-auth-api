import type { SignupUserDTO } from '../dtos/auth/signup-user.dto';
import type { UserEntity } from '../entities/user.entity';

export abstract class AuthDatasource {
    abstract signup(signupUserDTO: SignupUserDTO): Promise<UserEntity>;
}
