import { inferAsyncReturnType } from "@trpc/server";
import { CreateExpressContextOptions } from "@trpc/server/adapters/express";
import { redisClient } from "./redis";
import { getRedisKey, RedisKey } from "./utils/redis";

export interface SessionUser {
  id: string;
  isAdmin: boolean;
}

export const createContext = async (opts: CreateExpressContextOptions) => {
  const sessionID = opts.req.headers.authorization;
  if (sessionID == null) return {};

  const data = await redisClient.get(getRedisKey(RedisKey.SESSION, sessionID));
  if (data == null) return {};

  const user = JSON.parse(data) as SessionUser;
  return { sessionID, user };
};

export type Context = inferAsyncReturnType<typeof createContext>;
