import type { AuthDatasource } from '../../domain/datasources/auth.datasource';
import { type SignupUserDTO } from '../../domain/dtos/auth/signup-user.dto';
import { UserEntity } from '../../domain/entities/user.entity';
import { CustomError } from '../../domain/errors/custom.error';

export class AuthDatasourceImpl implements AuthDatasource {
    async signup(signupUserDTO: SignupUserDTO): Promise<UserEntity> {
        const { firstname, lastname, username, email, password } =
            signupUserDTO;
        try {
            return new UserEntity(
                '1',
                firstname,
                lastname,
                username,
                email,
                password
            );
        } catch (error) {
            if (error instanceof CustomError) {
                throw error;
            }
            throw CustomError.internalServer();
        }
    }
}
