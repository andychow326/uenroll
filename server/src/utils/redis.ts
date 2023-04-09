export const REDIS_KEY_PREFIX_SEPARATOR = ":";

/**
 * Redis key type used as a prefix for keys
 * @enum SESSION Stores the user object for corresponding session
 * @enum LOGIN_SESSION Stores a list of sessions for corresponding user
 * @enum ACCESS_TOKEN Stores the special access token
 */
export enum RedisKey {
  SESSION = "sess",
  LOGIN_SESSION = "login_sess",
  ACCESS_TOKEN = "access_token",
}

export function getRedisKey(type: RedisKey, key: string): string {
  return `${type}${REDIS_KEY_PREFIX_SEPARATOR}${key}`;
}

export function parseRedisKey(key: string): string {
  return key.split(REDIS_KEY_PREFIX_SEPARATOR)[1];
}
