import type { SignupUserDTO } from '../dtos/auth/signup-user.dto';
import { CustomError } from '../errors/custom.error';
import { type AuthRepository } from '../repositories/auth.repository';

interface signupUserUseCase {
    execute: (signupUserDTO: SignupUserDTO) => Promise<any>;
}

type SignToken = (
    payload: Record<string, unknown>,
    duration?: string
) => Promise<string | any>;
interface UserToken {
    token: string;
    user: {
        id: string;
        firstname: string;
        lastname: string;
        email: string;
    };
}

export class SignupUser implements signupUserUseCase {
    constructor(
        private readonly authRepository: AuthRepository,
        private readonly signToken: SignToken
    ) {}

    async execute(signupUserDTO: SignupUserDTO): Promise<UserToken> {
        const user = await this.authRepository.signup(signupUserDTO);
        const token = await this.signToken({ id: user.id }, '2h');
        if (token == null)
            throw CustomError.internalServer('Error generating token');
        return {
            token,
            user: {
                id: user.id,
                firstname: user.firstname,
                lastname: user.lastname,
                email: user.email
            }
        };
    }
}
