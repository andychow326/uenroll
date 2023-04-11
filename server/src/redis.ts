/* eslint-disable no-console */
import dotenv from "dotenv";
import { createClient } from "redis";

dotenv.config();

export const redisClient = createClient({
  socket: {
    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT),
  },
  username: process.env.REDIS_USER,
  password: process.env.REDIS_PASS,
});

export function setupRedisClient() {
  redisClient.on("connect", () => {
    console.log("Redis client is connected");
  });

  redisClient.on("disconnect", () => {
    console.log("Redis client is disconnected");
  });

  redisClient.on("error", (err) => {
    console.log("Redis client error:", err);
  });

  redisClient.connect().catch(() => {});
}
