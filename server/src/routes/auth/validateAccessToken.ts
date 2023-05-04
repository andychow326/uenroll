import { z } from "zod";
import { AuthErrorUnauthorized } from "../../exceptions";
import { publicProcedure } from "../../procedure";
import { redisClient } from "../../redis";
import { RedisKey, getRedisKey } from "../../utils/redis";

const inputSchema = z.string().trim().nonempty();

const validateAccessToken = publicProcedure
  .input(inputSchema)
  .query(async ({ input }) => {
    const userID = await redisClient.get(
      getRedisKey(RedisKey.ACCESS_TOKEN, input)
    );
    if (userID == null) {
      throw AuthErrorUnauthorized;
    }
    return userID;
  });

export default validateAccessToken;
