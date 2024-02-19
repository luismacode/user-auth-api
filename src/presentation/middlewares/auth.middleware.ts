import type { Request, Response, NextFunction } from 'express';
import { JwtAdapter } from '../../config/jwt';
import { UserModel } from '../../database/mongo/models/user.model';

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class AuthMiddleware {
    static async validateJWT(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | undefined> {
        const authorization = req.header('Authorization');
        if (authorization == null || authorization === undefined)
            return res.status(401).json({ error: 'No token provided' });
        if (!authorization.startsWith('Bearer '))
            return res.status(401).json({ error: 'Invalid token' });
        const token = authorization.split(' ').at(1) ?? '';
        try {
            const payload = await JwtAdapter.verifyToken<{ id: string }>(token);
            if (payload == null)
                return res.status(401).json({ error: 'Invalid token' });
            const user = await UserModel.findById(payload.id);
            if (user === null)
                return res.status(401).json({ error: 'Invalid token' });
            req.body.user = user;
            next();
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}
