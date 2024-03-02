import { Validators } from '../../../config/validators';

export class SigninUserDTO {
    private constructor(public email: string, public password: string) {}

    public static create(
        body: Record<string, string>
    ): [string?, SigninUserDTO?] {
        const { email, password } = body;
        if (email === undefined || email === '') return ['Missing email'];
        if (password === undefined || password === '')
            return ['Missing password'];
        if (!Validators.email.test(email)) return ['Email is not valid'];
        if (!Validators.password.test(password))
            return ['Password is not valid'];

        return [
            undefined,
            new SigninUserDTO(email.toLowerCase(), password.trim())
        ];
    }
}
