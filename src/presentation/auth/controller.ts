import { type Request, type Response } from 'express';
import { SignupUserDTO } from '../../domain/dtos/auth/signup-user.dto';
import { type AuthRepository } from '../../domain/repositories/auth.repository';
import { type UserEntity } from '../../domain/entities/user.entity';

export class AuthController {
    constructor(private readonly authRepository: AuthRepository) {
        // this.signinUser = this.signinUser.bind(this);
        // this.signupUser = this.signupUser.bind(this);
    }

    signinUser(req: Request, res: Response): Response {
        return res.json(req.body);
    }

    async signupUser(
        req: Request,
        res: Response
    ): Promise<Response<UserEntity, any> | undefined> {
        const { body } = req;
        const [error, signupUserDTO] = SignupUserDTO.create(
            body as Record<string, string>
        );
        if (error !== undefined) return res.status(400).json({ error });
        this.authRepository
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            .signup(signupUserDTO!)
            .then(user => res.json(user))
            .catch(error => res.status(500).json(error));
    }
}
