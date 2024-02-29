export class Validators {
    private readonly email: RegExp =
        /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

    private readonly firstname: RegExp = /^[\s\w]{4,30}$/;
    private readonly lastname: RegExp = /^[\s\w]{5,40}$/;
    private readonly username: RegExp = /^[\s\w]{8,30}$/;
    private readonly password: RegExp =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@#/()=¡¿?!*+{}%*&])([A-Za-z\d$@#/()=¡¿?!*+{}%*&]|[^\s]){16,}$/;

    public static get email(): RegExp {
        return new Validators().email;
    }

    public static get firstname(): RegExp {
        return new Validators().firstname;
    }

    public static get lastname(): RegExp {
        return new Validators().lastname;
    }

    public static get username(): RegExp {
        return new Validators().username;
    }

    public static get password(): RegExp {
        return new Validators().password;
    }
}
