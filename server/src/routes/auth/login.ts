import { z } from "zod";
import crypto from "crypto";
import { TRPCError } from "@trpc/server";
import { publicProcedure } from "../../procedure";
import { redisClient } from "../../redis";
import { getRedisKey, RedisKey } from "../../utils/redis";
import prisma from "../../prisma";
import { verifyPassword } from "../../utils/password";
import { SessionUser } from "../../context";

const inputSchema = z
  .object({
    userID: z.string().trim().nonempty(),
    password: z.string().trim().nonempty(),
  })
  .required();

const login = publicProcedure.input(inputSchema).query(async ({ input }) => {
  const user = await prisma.user.findUnique({
    where: {
      id: input.userID,
    },
  });

  if (user == null || !(await verifyPassword(user.password, input.password))) {
    throw new TRPCError({
      code: "FORBIDDEN",
      message: "User ID or Password is incorrect!",
    });
  }

  const sessionID = crypto.randomBytes(128).toString("base64");
  const sessionUser: SessionUser = { id: user.id, isAdmin: user.isAdmin };
  await Promise.all([
    redisClient.set(
      getRedisKey(RedisKey.SESSION, sessionID),
      JSON.stringify(sessionUser),
      {
        EX: 30 * 60, // 30 minutes expiration time
        NX: true, // Only set the key if it does not already exist
      }
    ),
    redisClient.rPush(getRedisKey(RedisKey.LOGIN_SESSION, user.id), sessionID),
    redisClient.expire(
      getRedisKey(RedisKey.LOGIN_SESSION, user.id),
      30 * 60 // 30 minutes expiration time
    ),
  ]);

  return sessionID;
});

export default login;
