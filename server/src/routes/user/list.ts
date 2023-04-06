import { z } from "zod";
import prisma from "../../prisma";
import { adminProcedure } from "../../procedure";

const inputSchema = z
  .object({
    userID: z.string().trim(),
    username: z.string().trim(),
    cursor: z.string().trim(),
  })
  .partial()
  .optional();

const list = adminProcedure.input(inputSchema).query(async ({ input }) => {
  const userID = input?.userID || undefined;
  const username = input?.username || undefined;
  const cursor = input?.cursor || undefined;

  const users = await prisma.user.findMany({
    take: 10,
    where:
      userID || username
        ? {
            OR: [
              {
                id: {
                  contains: userID,
                  mode: "insensitive",
                },
              },
              {
                firstName: {
                  contains: username,
                  mode: "insensitive",
                },
              },
              {
                lastName: {
                  contains: username,
                  mode: "insensitive",
                },
              },
            ],
          }
        : undefined,
    cursor: cursor ? { id: cursor } : undefined,
  });

  if (users.length === 0) {
    return [];
  }

  return users.map((user) => ({
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    isAdmin: user.isAdmin,
    dateOfBirth: user.dateOfBirth,
    phoneNumber: user.phoneNumber,
    gender: user.gender,
    major: user.major,
    address: user.address,
  }));
});

export default list;
