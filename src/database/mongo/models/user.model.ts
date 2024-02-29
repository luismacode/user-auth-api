import { Schema, model } from 'mongoose';

const UserSchema = new Schema(
    {
        _id: { type: String, _id: false },
        firstname: {
            type: String,
            minLength: 4,
            maxLength: 30,
            required: [true, 'Firstname is required']
        },
        lastname: {
            type: String,
            minLength: 5,
            maxLength: 40,
            required: [true, 'Lastname is required']
        },
        username: {
            type: String,
            minLength: 8,
            maxLength: 30,
            required: [true, 'Username is required'],
            unique: true
        },
        photo: { type: String, required: false },
        email: {
            type: String,
            required: [true, 'Email is required'],
            unique: true
        },
        password: {
            type: String,
            minLength: 16,
            required: [true, 'Password is required']
        }
    },
    {
        timestamps: true
    }
);

export const UserModel = model('User', UserSchema);
