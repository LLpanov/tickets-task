import dotenv from 'dotenv'

dotenv.config()

export const config = {
  PORT: process.env.PORT || 3000,
  BASE_URL: process.env.BASE_URL,
  NODE_ENV: process.env.NODE_ENV
}
