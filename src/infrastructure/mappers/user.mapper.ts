import { UserEntity } from '../../domain/entities/user.entity';
interface User {
    _id: string;
    firstname: string;
    lastname: string;
    username: string;
    email: string;
    password: string;
    createdAt: string;
    updatedAt: string;
}

export const userMapper = (user: User): UserEntity => {
    const {
        _id,
        firstname,
        lastname,
        username,
        email,
        password,
        createdAt,
        updatedAt
    } = user;
    return new UserEntity(
        _id,
        firstname,
        lastname,
        username,
        email,
        password,
        createdAt,
        updatedAt
    );
};
