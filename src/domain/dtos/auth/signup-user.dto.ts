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
        if (email === undefined || email === '') return ['Missing email'];
        if (password === undefined || password === '')
            return ['Missing password'];
        if (!Validators.email.test(email)) return ['Email is not valid'];
        if (!Validators.firstname.test(firstname))
            return ['Firstname is not valid'];
        if (!Validators.lastname.test(lastname))
            return ['Lastname is not valid'];
        if (!Validators.username.test(username))
            return ['Username is not valid'];
        if (!Validators.password.test(password))
            return ['Password is not valid'];

        return [
            undefined,
            new SignupUserDTO(
                firstname.trim(),
                lastname.trim(),
                username.trim(),
                email.toLowerCase(),
                password.trim()
            )
        ];
    }
}
