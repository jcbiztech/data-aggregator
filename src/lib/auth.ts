// src/lib/auth.ts
import { betterAuth } from "better-auth";
import { createAuthMiddleware, openAPI } from "better-auth/plugins";
import { Pool } from "pg";
import Redis from "ioredis";
import dotenv from "dotenv";
dotenv.config();

export const redis = new Redis(`${process.env.REDIS_URL}?family=0`);

const isProduction = process.env.NODE_ENV === "production";

export const auth = betterAuth({
  secret: process.env.BETTER_AUTH_SECRET!,
  baseURL: process.env.BETTER_AUTH_URL!,
  origin: [
    process.env.FRONTEND_URL!,
    "http://localhost:3000",
  ],
  emailAndPassword: {
    enabled: true,
  },
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 60 * 5, // 5 mins
    },
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
  },
  plugins: [openAPI()],
  database: new Pool({ connectionString: process.env.DATABASE_URL }),
  secondaryStorage: {
    get: async (key) => {
      const value = await redis.get(key);
      return value ?? null;
    },
    set: async (key, value, ttl) => {
      if (ttl) await redis.set(key, value, "EX", ttl);
      else await redis.set(key, value);
    },
    delete: async (key) => {
      await redis.del(key);
    },
  },
});
