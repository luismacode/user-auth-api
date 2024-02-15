export class UserEntity {
    constructor(
        public id: string,
        public firstname: string,
        public lastname: string,
        public username: string,
        public email: string,
        public password: string,
        public createdAt?: string,
        public updatedAt?: string,
        public photo?: string
    ) {}
}
