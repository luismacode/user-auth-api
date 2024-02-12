import { Router } from 'express';
import { AuthRoutes } from './auth/routes';

export class AppRoutes {
    private readonly router = Router();

    public get routes(): Router {
        this.router.use('/app2/api/v1/auth', new AuthRoutes().routes);

        return this.router;
    }
}
