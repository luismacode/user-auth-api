import { Router } from 'express';
import { AuthController } from './controller';

export class AuthRoutes {
    private readonly router = Router();
    public get routes(): Router {
        const controller = new AuthController();
        this.router.post('/signin', controller.signinUser.bind(controller));
        this.router.post('/signup', controller.signupUser.bind(controller));

        return this.router;
    }
}
