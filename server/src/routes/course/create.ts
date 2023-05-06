import { z } from "zod";
import { CourseErrorCourseAlreadyExists } from "../../exceptions";
import prisma from "../../prisma";
import { adminProcedure } from "../../procedure";

export const inputSchema = z
  .object({
    subject: z.string().trim().length(4).toUpperCase(),
    number: z.string().trim().length(4),
    title: z.string().trim().nonempty(),
    career: z.string().trim(),
    units: z.number().gt(0),
    description: z.string(),
    learningOutcome: z.string(),
    syllabus: z.string(),
    requiredReadings: z.string(),
    recommendedReadings: z.string(),
  })
  .required();

const create = adminProcedure.input(inputSchema).mutation(async ({ input }) => {
  const isExists =
    (await prisma.course.count({
      where: {
        subject: input.subject,
        number: input.number,
      },
    })) > 0;

  if (isExists) {
    throw CourseErrorCourseAlreadyExists;
  }

  await prisma.course.create({
    data: {
      subject: input.subject,
      number: input.number,
      title: input.title,
      career: input.career,
      units: input.units,
      description: input.description,
      learningOutcome: input.learningOutcome,
      syllabus: input.syllabus,
      requiredReadings: input.requiredReadings,
      recommendedReadings: input.recommendedReadings,
    },
  });
});

export default create;
