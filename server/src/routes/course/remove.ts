import { TRPCError } from "@trpc/server";
import { z } from "zod";
import prisma from "../../prisma";
import { adminProcedure } from "../../procedure";

const inputSchema = z.object({
  type: z.enum(["course", "openedCourse"]),
  id: z.string().optional(),
  subject: z.string().optional(),
  number: z.string().optional(),
});

const remove = adminProcedure.input(inputSchema).query(async ({ input }) => {
  const { id, subject, number } = input;

  if (input.type === "openedCourse") {
    const isExists =
      (await prisma.openedCourse.count({
        where: { id },
      })) > 0;

    if (!isExists) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "error.server.course.not_found",
      });
    }

    await prisma.enrolledCourse.deleteMany({
      where: { courseId: id },
    });

    await prisma.openedCourse.delete({
      where: { id },
    });

    return true;
  }

  const isExists =
    (await prisma.course.count({
      where: { subject, number },
    })) > 0;

  if (!isExists) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "error.server.course.not_found",
    });
  }

  await prisma.openedCourse.deleteMany({
    where: { subject, number },
  });

  await prisma.course.delete({
    where: {
      subject_number: subject && number ? { subject, number } : undefined,
    },
  });

  return true;
});

export default remove;
