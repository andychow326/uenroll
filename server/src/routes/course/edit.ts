import { CourseErrorCourseNotFound } from "../../exceptions";
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
    throw CourseErrorCourseNotFound;
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
