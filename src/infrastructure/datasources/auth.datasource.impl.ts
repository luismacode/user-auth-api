import { randomUUID } from 'node:crypto';
import { UserModel } from '../../database/mongo/models/user.model';
import type { AuthDatasource } from '../../domain/datasources/auth.datasource';
import { type SignupUserDTO } from '../../domain/dtos/auth/signup-user.dto';
import { type UserEntity } from '../../domain/entities/user.entity';
import { CustomError } from '../../domain/errors/custom.error';
import { userMapper } from '../mappers/user.mapper';
import { type SigninUserDTO } from '../../domain/dtos/auth/signin-user.dto';

export class AuthDatasourceImpl implements AuthDatasource {
    private readonly uuid: string;
    constructor(
        private readonly hash: (password: string) => string,
        private readonly compare: (password: string, hashed: string) => boolean
    ) {
        this.uuid = randomUUID();
    }

    async signup(signupUserDTO: SignupUserDTO): Promise<UserEntity> {
        const { firstname, lastname, username, email, password } =
            signupUserDTO;
        try {
            const exists = await UserModel.findOne({ email });
            if (exists instanceof UserModel)
                throw CustomError.badRequest('User already exists');
            const user = new UserModel({
                _id: this.uuid,
                firstname,
                lastname,
                username,
                email,
                password: this.hash(password)
            });

            await user.save();
            return userMapper(user.toObject());
        } catch (error) {
            if (error instanceof CustomError) {
                throw error;
            }
            throw CustomError.internalServer();
        }
    }

    async signin(signinUserDTO: SigninUserDTO): Promise<UserEntity> {
        const { email, password } = signinUserDTO;
        try {
            const user = await UserModel.findOne({ email });
            if (user instanceof UserModel) {
                const isMatching = this.compare(password, user.password);
                if (!isMatching)
                    throw CustomError.badRequest('Wrong Credentials');
                return userMapper(user.toObject());
            } else {
                throw CustomError.badRequest('Wrong Credentials');
            }
        } catch (error) {
            console.log(error);
            throw CustomError.internalServer();
        }
    }
}
