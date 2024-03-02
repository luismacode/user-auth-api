import { type AuthDatasource } from '../../domain/datasources/auth.datasource';
import { type SignupUserDTO } from '../../domain/dtos/auth/signup-user.dto';
import { type UserEntity } from '../../domain/entities/user.entity';
import { type AuthRepository } from '../../domain/repositories/auth.repository';

export class AuthRepositoryImpl implements AuthRepository {
    constructor(private readonly authDatasource: AuthDatasource) {}

    async signup(signupUserDTO: SignupUserDTO): Promise<UserEntity> {
        return await this.authDatasource.signup(signupUserDTO);
    }

    async signin(signinUserDTO: SignupUserDTO): Promise<UserEntity> {
        return await this.authDatasource.signin(signinUserDTO);
    }
}
