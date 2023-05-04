import { Context, SessionUser } from "../../src/context";
import { redisClient } from "../../src/redis";
import { RedisKey, getRedisKey } from "../../src/utils/redis";

async function MockUser(sessionID?: string): Promise<Context | undefined> {
  if (sessionID == null) return undefined;

  const data = await redisClient.get(getRedisKey(RedisKey.SESSION, sessionID));
  if (data == null) return undefined;

  const user = JSON.parse(data) as SessionUser;
  return { sessionID, user };
}

export default MockUser;
