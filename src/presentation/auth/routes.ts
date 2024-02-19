import { Router } from 'express';
import { AuthController } from './controller';
import { AuthDatasourceImpl } from '../../infrastructure/datasources/auth.datasource.impl';
import { AuthRepositoryImpl } from '../../infrastructure/repositories/auth.repository.impl';
import { BcryptAdapter } from '../../config/bcrypt';
import { AuthMiddleware } from '../middlewares/auth.middleware';

export class AuthRoutes {
    private readonly router = Router();
    public get routes(): Router {
        const datasource = new AuthDatasourceImpl(
            BcryptAdapter.hash.bind(this)
        );
        const authRepository = new AuthRepositoryImpl(datasource);
        const controller = new AuthController(authRepository);
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        this.router.post('/signup', controller.signupUser.bind(controller));
        // this.router.post('/signin', controller.signinUser.bind(controller));
        this.router.get(
            '/',
            [AuthMiddleware.validateJWT.bind(this)],
            controller.getUsers
        );
        return this.router;
    }
}
