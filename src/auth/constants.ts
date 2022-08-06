import 'dotenv/config';

export const jwtConstants = {
  secret: process.env.JWT_SECRET_KEY,
  secretRefresh: process.env.JWT_SECRET_REFRESH_KEY,
  expiresIn: process.env.TOKEN_EXPIRE_TIME,
};