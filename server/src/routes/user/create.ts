import { Gender } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import crypto from "crypto";
import { z } from "zod";
import { sendRegistrationEmail } from "../../mailer";
import prisma from "../../prisma";
import { adminProcedure } from "../../procedure";
import { redisClient } from "../../redis";
import { RedisKey, getRedisKey } from "../../utils/redis";

export const inputSchema = z
  .object({
    id: z.string().trim().toLowerCase(),
    firstName: z.string().trim().nonempty(),
    lastName: z.string().trim().nonempty(),
    email: z.string().trim().nonempty().email(),
    isAdmin: z.boolean(),
    dateOfBirth: z.coerce.date(),
    phoneNumber: z.string().trim().nonempty(),
    gender: z.enum([Gender.MALE, Gender.FEMALE, Gender.OTHER]),
    major: z.string().trim(),
    address: z.string().trim().nonempty(),
  })
  .required();

const create = adminProcedure.input(inputSchema).query(async ({ input }) => {
  let userID = input.isAdmin ? input.id : null;
  if (userID == null) {
    const nextUser = await prisma.nextStudent.findFirst();
    if (nextUser == null) {
      throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
    }
    userID = nextUser.id.toString();

    await prisma.nextStudent.update({
      where: {
        id: nextUser.id,
      },
      data: {
        id: nextUser.id + BigInt(1),
      },
    });
  }

  const user = await prisma.user.create({
    data: {
      ...input,
      id: userID,
      password: "",
    },
  });

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

  return user;
});

export default create;
