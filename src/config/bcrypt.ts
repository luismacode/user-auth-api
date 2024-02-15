import { compareSync, genSaltSync, hashSync } from 'bcryptjs';

export class BcryptAdapter {
    private readonly salt: string;
    private constructor() {
        this.salt = genSaltSync(12);
    }

    static hash(password: string): string {
        return hashSync(password, new BcryptAdapter().salt);
    }

    static compare(password: string, hashed: string): boolean {
        return compareSync(password, hashed);
    }
}
