import { TRPCError } from "@trpc/server";
import { redisClient } from "../redis";
import trpc from "../trpc";
import { RedisKey, getRedisKey } from "../utils/redis";

const auth = trpc.middleware(async ({ ctx, next }) => {
  if (ctx.user == null) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }

  await redisClient.expire(
    getRedisKey(RedisKey.SESSION, ctx.sessionID),
    30 * 60 // 30 minutes expiration time
  );

  return next({ ctx });
});

export default auth;
