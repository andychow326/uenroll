import { Context, SessionUser } from "../../src/context";
import { redisClient } from "../../src/redis";
import { RedisKey, getRedisKey } from "../../src/utils/redis";

async function MockUser(sessionID?: string): Promise<Context | null> {
  if (sessionID == null) return null;

  const data = await redisClient.get(getRedisKey(RedisKey.SESSION, sessionID));
  if (data == null) return null;

  const user = JSON.parse(data) as SessionUser;
  return { sessionID, user };
}

export default MockUser;
