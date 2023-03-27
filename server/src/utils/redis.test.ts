import { getRedisKey, parseRedisKey, RedisKey } from "./redis";

describe("redis", () => {
  it("should return the original key after parsing", () => {
    const keyType = RedisKey.SESSION;
    const key = "test";
    const redisKey = getRedisKey(keyType, key);
    expect(parseRedisKey(redisKey)).toEqual(key);
  });
});
