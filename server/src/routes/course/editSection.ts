import { CourseErrorCourseNotFound } from "../../exceptions";
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
      throw CourseErrorCourseNotFound;
    }

    await prisma.openedCourse.update({
      where: {
        id: input.id,
      },
      data: input,
    });
  });

export default editSection;
