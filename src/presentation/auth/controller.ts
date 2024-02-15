import { type Request, type Response } from 'express';
import { SignupUserDTO } from '../../domain/dtos/auth/signup-user.dto';
import { type AuthRepository } from '../../domain/repositories/auth.repository';
import { CustomError } from '../../domain/errors/custom.error';
import { JwtAdapter } from '../../config/jwt';

export class AuthController {
    constructor(private readonly authRepository: AuthRepository) {
        // this.signinUser = this.signinUser.bind(this);
        // this.signupUser = this.signupUser.bind(this);
    }

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

    signinUser(req: Request, res: Response): Response {
        return res.json(req.body);
    }

    signupUser(req: Request, res: Response): Response | undefined {
        const { body } = req;
        const [error, signupUserDTO] = SignupUserDTO.create(
            body as Record<string, string>
        );
        if (error !== undefined) return res.status(400).json({ error });
        this.authRepository
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            .signup(signupUserDTO!)
            .then(async user =>
                res.json({
                    user,
                    token: await JwtAdapter.generateToken({ id: user.id })
                })
            )
            .catch(error => this.handleError(error, res));
    }
}
