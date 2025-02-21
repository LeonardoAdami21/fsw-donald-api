import * as dotenv from 'dotenv';

dotenv.config();

export const nodeEnv = process.env.NODE_ENV;

export const appPort = process.env.PORT || 3000;

export const prismaUrl = process.env.DATABASE_URL;