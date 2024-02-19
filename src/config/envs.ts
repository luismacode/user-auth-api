import 'dotenv/config';
import { get } from 'env-var';

export const envs = {
    PORT: get('PORT').required().asPortNumber(),
    DATABASE_CONNECTION_URL: get('DATABASE_CONNECTION_URL')
        .required()
        .asUrlString(),
    DATABASE_NAME: get('DATABASE_NAME').required().asString(),
    JWT_SEED: get('JWT_SEED').required().asString()
};
