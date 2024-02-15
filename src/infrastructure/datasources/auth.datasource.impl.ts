import { randomUUID } from 'node:crypto';
import { UserModel } from '../../database/mongo/models/user.model';
import type { AuthDatasource } from '../../domain/datasources/auth.datasource';
import { type SignupUserDTO } from '../../domain/dtos/auth/signup-user.dto';
import { UserEntity } from '../../domain/entities/user.entity';
import { CustomError } from '../../domain/errors/custom.error';

export class AuthDatasourceImpl implements AuthDatasource {
    constructor(private readonly hash: (password: string) => string) {}

    async signup(signupUserDTO: SignupUserDTO): Promise<UserEntity> {
        const { firstname, lastname, username, email, password } =
            signupUserDTO;
        try {
            const exists = await UserModel.findOne({ email });
            if (exists instanceof UserModel)
                throw CustomError.badRequest('User already exists');
            const user = await UserModel.create({
                _id: randomUUID(),
                firstname,
                lastname,
                username,
                email,
                password: this.hash(password)
            });

            await user.save();
            return new UserEntity(
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                user._id!,
                user.firstname,
                user.lastname,
                user.username,
                user.email,
                user.password
            );
        } catch (error) {
            if (error instanceof CustomError) {
                throw error;
            }
            throw CustomError.internalServer();
        }
    }
}
