export class Validators {
    private readonly email: RegExp =
        /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

    public static get email(): RegExp {
        return new Validators().email;
    }
}
