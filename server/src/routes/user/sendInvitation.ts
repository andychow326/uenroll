import { TRPCError } from "@trpc/server";
import crypto from "crypto";
import { z } from "zod";
import { sendRegistrationEmail } from "../../mailer";
import prisma from "../../prisma";
import { adminProcedure } from "../../procedure";
import { redisClient } from "../../redis";
import { RedisKey, getRedisKey } from "../../utils/redis";

const inputSchema = z.string().trim();

const sendInvitation = adminProcedure
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
        EX: 30 * 24 * 60 * 60, // 30 days expiration time
      }
    );
    const redirectURL = `${process.env.ORIGIN}auth/resetPassword?accessToken=${accessToken}`;
    await sendRegistrationEmail(user.email, user.firstName, redirectURL);

    return true;
  });

export default sendInvitation;
