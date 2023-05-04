import { AuthErrorUnauthorized } from "../exceptions";
import { redisClient } from "../redis";
import trpc from "../trpc";
import { RedisKey, getRedisKey } from "../utils/redis";

const auth = trpc.middleware(async ({ ctx, next }) => {
  if (ctx.user == null) {
    throw AuthErrorUnauthorized;
  }

  await redisClient.expire(
    getRedisKey(RedisKey.SESSION, ctx.sessionID),
    30 * 60 // 30 minutes expiration time
  );

  return next({ ctx });
});

export default auth;
