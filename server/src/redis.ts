/* eslint-disable no-console */
import { createClient } from "redis";

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
