import { TRPCError } from "@trpc/server";
import prisma from "../../prisma";
import { adminProcedure } from "../../procedure";
import { inputSchema } from "./createSection";

const editSection = adminProcedure
  .input(inputSchema)
  .mutation(async ({ input }) => {
    const isExists =
      (await prisma.openedCourse.findUnique({
        where: { id: input.id },
      })) != null;

    if (!isExists) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "error.server.course.not_found",
      });
    }

    await prisma.openedCourse.update({
      where: {
        id: input.id,
      },
      data: input,
    });
  });

export default editSection;
