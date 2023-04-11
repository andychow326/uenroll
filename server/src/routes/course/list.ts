import { z } from "zod";
import prisma from "../../prisma";
import { authProcedure } from "../../procedure";

const inputSchema = z.object({
  type: z.enum(["course", "openedCourse"]),
  code: z.string().trim().optional(),
  title: z.string().trim().optional(),
  period: z
    .object({
      year: z.number(),
      semester: z.string().trim(),
    })
    .partial()
    .optional(),
});

const list = authProcedure.input(inputSchema).query(async ({ input }) => {
  const subject = input?.code?.replace(/[^a-zA-Z]/g, "") || undefined;
  const number = input?.code?.replace(/[^0-9]/g, "") || undefined;
  const title = input?.title || undefined;
  const year = input?.period?.year || undefined;
  const semester = input?.period?.semester || undefined;

  if (input.type === "openedCourse") {
    const openedCourses = await prisma.openedCourse.findMany({
      where:
        subject || number || title || year || semester
          ? {
              OR: [
                {
                  course: {
                    OR: [
                      {
                        title: {
                          contains: title,
                          mode: "insensitive",
                        },
                      },
                      {
                        subject: {
                          contains: subject,
                          mode: "insensitive",
                        },
                      },
                      {
                        number: {
                          contains: number,
                        },
                      },
                    ],
                  },
                },
                {
                  AND: [
                    {
                      year,
                    },
                    {
                      semester,
                    },
                  ],
                },
              ],
            }
          : undefined,
      include: {
        course: true,
      },
    });

    return openedCourses.map((openedCourse) => ({
      type: "openedCourse",
      ...openedCourse,
      course: {
        ...openedCourse.course,
      },
    }));
  }

  if (input.type === "course") {
    const courses = await prisma.course.findMany({
      where:
        subject || number || title || year || semester
          ? {
              OR: [
                {
                  title: {
                    contains: title,
                    mode: "insensitive",
                  },
                },
                {
                  subject: {
                    contains: subject,
                    mode: "insensitive",
                  },
                },
                {
                  number: {
                    contains: number,
                  },
                },
                {
                  openedCourse: {
                    some: {
                      AND: [{ year }, { semester }],
                    },
                  },
                },
              ],
            }
          : undefined,
      include: {
        openedCourse: true,
      },
    });

    return courses.map((course) => ({
      type: "course",
      ...course,
    }));
  }

  return null;
});

export default list;
