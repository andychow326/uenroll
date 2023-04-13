import { TRPCError } from "@trpc/server";
import prisma from "../../prisma";
import { adminProcedure } from "../../procedure";
import { inputSchema } from "./create";

const edit = adminProcedure.input(inputSchema).mutation(async ({ input }) => {
  const isExists =
    (await prisma.course.count({
      where: {
        subject: input.subject,
        number: input.number,
      },
    })) > 0;

  if (!isExists) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "error.server.course.not_found",
    });
  }

  await prisma.course.update({
    where: {
      subject_number: {
        subject: input.subject,
        number: input.number,
      },
    },
    data: input,
  });
});

export default edit;
