import jwt from 'jsonwebtoken';

export class JwtAdapter {
    private readonly seed: string;
    private constructor() {
        this.seed = 'SEED';
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
}
