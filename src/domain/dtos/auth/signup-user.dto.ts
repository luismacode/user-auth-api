import { Validators } from '../../../config/validators';

export class SignupUserDTO {
    private constructor(
        public firstname: string,
        public lastname: string,
        public username: string,
        public email: string,
        public password: string
    ) {}

    public static create(
        body: Record<string, string>
    ): [string?, SignupUserDTO?] {
        const { firstname, lastname, username, email, password } = body;
        if (firstname === undefined || firstname === '')
            return ['Missing Firstname'];
        if (lastname === undefined || lastname === '')
            return ['Missing Lastname'];
        if (username === undefined || username === '')
            return ['Missing username'];
        if (!Validators.email.test(email)) return ['Email is not valid'];
        if (password === undefined || password === '')
            return ['Missing password'];

        return [
            undefined,
            new SignupUserDTO(
                firstname,
                lastname,
                username,
                email.toLowerCase(),
                password
            )
        ];
    }
}
