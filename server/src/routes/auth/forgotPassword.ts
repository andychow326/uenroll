import { TRPCError } from "@trpc/server";
import crypto from "crypto";
import { z } from "zod";
import { sendForgotPasswordEmail } from "../../mailer";
import prisma from "../../prisma";
import { publicProcedure } from "../../procedure";
import { redisClient } from "../../redis";
import { getRedisKey, RedisKey } from "../../utils/redis";

const inputSchema = z.string().trim().nonempty();

const forgotPassword = publicProcedure
  .input(inputSchema)
  .query(async ({ input }) => {
    const user = await prisma.user.findUnique({
      where: {
        id: input,
      },
    });

    if (user == null) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "error.server.user_not_found",
      });
    }

    const accessToken = crypto
      .randomBytes(128)
      .toString("base64")
      .replace(/[^a-zA-Z0-9]/g, "");
    await redisClient.set(
      getRedisKey(RedisKey.ACCESS_TOKEN, accessToken),
      user.id,
      {
        EX: 15 * 60, // 15 mintues expiration time
      }
    );
    const redirectURL = `${process.env.ORIGIN}auth/resetPassword?accessToken=${accessToken}`;
    await sendForgotPasswordEmail(user.email, user.firstName, redirectURL);

    return true;
  });

export default forgotPassword;
