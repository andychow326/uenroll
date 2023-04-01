import { TRPCError } from "@trpc/server";
import prisma from "../../prisma";
import { authProcedure } from "../../procedure";

const profile = authProcedure.query(async ({ ctx }) => {
  const user = await prisma.user.findUnique({
    where: {
      id: ctx.user.id,
    },
  });
  if (user == null) {
    throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
  }

  return {
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    isAdmin: user.isAdmin,
  };
});

export default profile;
