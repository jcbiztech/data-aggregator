import dotenv from 'dotenv';
dotenv.config();

import app from '../app';
import Redis from 'ioredis';
import { pool } from './db';

// Redis instance used across app and auth
export const redis = new Redis(`${process.env.REDIS_URL}?family=0`);

const PORT = process.env.PORT || 3001;

async function start() {
  try {
    // Test database connection
    await pool.query('SELECT 1');
    console.log('✅ Connected to PostgreSQL');

    // Connect Redis
    await redis.connect();
    console.log('✅ Connected to Redis');

    // Start Express app
    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('❌ Startup error:', error);
    process.exit(1);
  }
}

start();
