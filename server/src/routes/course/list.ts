import { Course, OpenedCourse } from "@prisma/client";
import { z } from "zod";
import prisma from "../../prisma";
import { authProcedure } from "../../procedure";

export const MAX_COURSE_LIST_SIZE = 20;

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
  offset: z.number().optional(),
});

const list = authProcedure.input(inputSchema).query(async ({ input }) => {
  const subject = input?.code?.replace(/[^a-zA-Z]/g, "") || undefined;
  const number = input?.code?.replace(/[^0-9]/g, "") || undefined;
  const title = input?.title || undefined;
  const year = input?.period?.year || undefined;
  const semester = input?.period?.semester || undefined;
  const offset = input?.offset || 1;

  if (input.type === "openedCourse") {
    const openedCourses = await prisma.openedCourse.findMany({
      skip: (offset - 1) * MAX_COURSE_LIST_SIZE,
      take: MAX_COURSE_LIST_SIZE,
      where: {
        AND: [
          {
            course: {
              AND: [
                {
                  title: title
                    ? {
                        contains: title,
                        mode: "insensitive",
                      }
                    : undefined,
                },
                {
                  subject: subject
                    ? {
                        contains: subject,
                        mode: "insensitive",
                      }
                    : undefined,
                },
                {
                  number: number
                    ? {
                        contains: number,
                      }
                    : undefined,
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
      },
      include: {
        course: true,
        _count: { select: { EnrolledCourse: true } },
      },
    });

    const map1 = new Map<string, (OpenedCourse & { openSeats: number })[]>();
    const map2 = new Map<string, Course>();
    openedCourses.forEach((openedCourse) => {
      const key = `${openedCourse.subject}${openedCourse.number}`;
      const openedCourseData = {
        ...openedCourse,
        // eslint-disable-next-line no-underscore-dangle
        openSeats: openedCourse.capacity - openedCourse._count.EnrolledCourse,
        _count: undefined,
      };
      map1.set(
        key,
        map1.get(key)?.concat([openedCourseData]) ?? [openedCourseData]
      );
      map2.set(key, openedCourse.course);
    });

    return Object.entries(Object.fromEntries(map1)).map((value) => ({
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      ...map2.get(value[0])!,
      openedCourse: value[1],
    }));
  }

  const courses = await prisma.course.findMany({
    skip: (offset - 1) * MAX_COURSE_LIST_SIZE,
    take: MAX_COURSE_LIST_SIZE,
    where: {
      AND: [
        {
          title: title
            ? {
                contains: title,
                mode: "insensitive",
              }
            : undefined,
        },
        {
          subject: subject
            ? {
                contains: subject,
                mode: "insensitive",
              }
            : undefined,
        },
        {
          number: number
            ? {
                contains: number,
              }
            : undefined,
        },
        {
          openedCourse:
            year || semester
              ? {
                  some: {
                    AND: [{ year }, { semester }],
                  },
                }
              : undefined,
        },
      ],
    },
    include: {
      openedCourse: true,
    },
  });

  return courses;
});

export default list;
