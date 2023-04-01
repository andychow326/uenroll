import { authProcedure } from "../../procedure";
import { redisClient } from "../../redis";
import { getRedisKey, RedisKey } from "../../utils/redis";

const logout = authProcedure.query(async ({ ctx }) => {
  await Promise.all([
    redisClient.del(getRedisKey(RedisKey.SESSION, ctx.sessionID)),
    redisClient.lRem(
      getRedisKey(RedisKey.LOGIN_SESSION, ctx.user.id),
      1,
      ctx.sessionID
    ),
  ]);

  return null;
});

export default logout;
