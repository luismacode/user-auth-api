import { type Request, type Response } from 'express';
import { SignupUserDTO } from '../../domain/dtos/auth/signup-user.dto';
import { SigninUserDTO } from '../../domain/dtos/auth/signin-user.dto';
import { type AuthRepository } from '../../domain/repositories/auth.repository';
import { CustomError } from '../../domain/errors/custom.error';
import { JwtAdapter } from '../../config/jwt';
import { UserModel } from '../../database/mongo/models/user.model';
import { SignupUser } from '../../domain/usecases/signup-user.usecase';
import { SigninUser } from '../../domain/usecases/signin-user.usecase';

export class AuthController {
    constructor(private readonly authRepository: AuthRepository) {}

    private readonly handleError = (
        error: unknown,
        res: Response
    ): Response => {
        if (error instanceof CustomError) {
            return res.status(error.statusCode).json({ error: error.message });
        }
        console.log(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    };

    signinUser(req: Request, res: Response): Response | undefined {
        const { body } = req;
        const [error, signinUserDTO] = SigninUserDTO.create(
            body as Record<string, string>
        );
        if (error !== undefined) return res.status(400).json({ error });
        else {
            new SigninUser(
                this.authRepository,
                JwtAdapter.generateToken.bind(this)
            )
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                .execute(signinUserDTO!)
                .then(data => res.json(data))
                .catch(error => this.handleError(error, res));
        }
    }

    signupUser(req: Request, res: Response): Response | undefined {
        const { body } = req;
        const [error, signupUserDTO] = SignupUserDTO.create(
            body as Record<string, string>
        );
        if (error !== undefined) return res.status(400).json({ error });
        else {
            new SignupUser(
                this.authRepository,
                JwtAdapter.generateToken.bind(this)
            )
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                .execute(signupUserDTO!)
                .then(data => res.json(data))
                .catch(error => this.handleError(error, res));
        }
    }

    getUsers = (req: Request, res: Response): void => {
        UserModel.find()
            .then(users => res.json({ user: req.body.user }))
            .catch(() =>
                res.status(500).json({ error: 'Internal server error' })
            );
    };
}
