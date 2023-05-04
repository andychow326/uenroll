import { z } from "zod";
import {
  CourseErrorCourseAlreadyExists,
  CourseErrorCourseNotFound,
} from "../../exceptions";
import prisma from "../../prisma";
import { adminProcedure } from "../../procedure";

export const inputSchema = z
  .object({
    id: z.string().trim().optional(),
    subject: z.string().trim().nonempty(),
    number: z.string().trim().nonempty(),
    section: z.string().trim().nonempty().toUpperCase(),
    year: z.number(),
    semester: z.string().trim().nonempty(),
    timeSlotIds: z.array(z.string().trim()),
    venue: z.string().trim().nonempty(),
    instructor: z.string().trim().nonempty(),
    capacity: z.number().gt(0),
  })
  .required();

const createSection = adminProcedure
  .input(inputSchema)
  .mutation(async ({ input }) => {
    const course = await prisma.course.findUnique({
      where: {
        subject_number: {
          subject: input.subject,
          number: input.number,
        },
      },
    });

    if (!course) {
      throw CourseErrorCourseNotFound;
    }

    const openedCourse = await prisma.openedCourse.findUnique({
      where: {
        subject_number_section_year_semester: {
          subject: input.subject,
          number: input.number,
          section: input.section,
          year: input.year,
          semester: input.semester,
        },
      },
    });

    if (openedCourse != null) {
      throw CourseErrorCourseAlreadyExists;
    }

    await prisma.openedCourse.create({
      data: {
        ...input,
        id: undefined,
      },
    });
  });

export default createSection;
