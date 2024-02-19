import jwt from 'jsonwebtoken';
import { envs } from './envs';

const JWT_SEED = envs.JWT_SEED;

export class JwtAdapter {
    private readonly seed: string;
    private constructor() {
        this.seed = JWT_SEED;
    }

    static async generateToken(
        payload: Record<string, unknown>,
        duration: string = '1h'
    ): Promise<string | any> {
        return await new Promise(resolve => {
            jwt.sign(
                payload,
                new JwtAdapter().seed,
                { expiresIn: duration },
                (error, token) => {
                    if (error instanceof Error) resolve(null);
                    resolve(token ?? undefined);
                }
            );
        });
    }

    static async verifyToken<T>(token: string): Promise<T | null> {
        return await new Promise(resolve => {
            jwt.verify(token, new JwtAdapter().seed, (error, decoded) => {
                if (error !== null) resolve(null);
                resolve(decoded as T);
            });
        });
    }
}
