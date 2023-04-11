import { TRPCError } from "@trpc/server";
import { z } from "zod";
import prisma from "../../prisma";
import { publicProcedure } from "../../procedure";
import { redisClient } from "../../redis";
import { hashPassword } from "../../utils/password";
import { RedisKey, getRedisKey } from "../../utils/redis";

const inputSchema = z
  .object({
    password: z.string().trim().min(8),
    confirmPassword: z.string().trim(),
    accessToken: z.string().trim().nonempty(),
  })
  .required()
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must be the same",
    path: ["confirmPassword"],
  });

const resetPassword = publicProcedure
  .input(inputSchema)
  .query(async ({ input }) => {
    const userID = await redisClient.get(
      getRedisKey(RedisKey.ACCESS_TOKEN, input.accessToken)
    );
    if (userID == null) {
      throw new TRPCError({ code: "UNAUTHORIZED" });
    }

    const password = await hashPassword(input.password);

    const user = await prisma.user.update({
      where: {
        id: userID,
      },
      data: { password },
    });
    if (user == null) {
      throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
    }

    await redisClient.del(
      getRedisKey(RedisKey.ACCESS_TOKEN, input.accessToken)
    );

    return true;
  });

export default resetPassword;
