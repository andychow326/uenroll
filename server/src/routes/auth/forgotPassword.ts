import crypto from "crypto";
import { z } from "zod";
import { AuthErrorUserNotFound } from "../../exceptions";
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
      throw AuthErrorUserNotFound;
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

    if (process.env.IN_TEST) return { email: user.email, accessToken };

    const redirectURL = `${process.env.ORIGIN}auth/resetPassword?accessToken=${accessToken}`;
    await sendForgotPasswordEmail(user.email, user.firstName, redirectURL);

    return true;
  });

export default forgotPassword;
