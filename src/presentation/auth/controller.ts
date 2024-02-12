import { type Request, type Response } from 'express';

export class AuthController {
    constructor() {
        this.signinUser = this.signinUser.bind(this);
        this.signupUser = this.signupUser.bind(this);
    }

    signinUser(_: Request, res: Response): Response {
        return res.json('Sign in controller');
    }

    signupUser(_: Request, res: Response): Response {
        return res.json('Sign up controller');
    }
}
