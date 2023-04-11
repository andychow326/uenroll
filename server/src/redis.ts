/* eslint-disable no-console */
import dotenv from "dotenv";
import { createClient } from "redis";

dotenv.config();

export const redisClient = createClient({
  url: process.env.REDIS_URL,
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
