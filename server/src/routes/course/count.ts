import { z } from "zod";
import prisma from "../../prisma";
import { authProcedure } from "../../procedure";
import { MAX_COURSE_LIST_SIZE } from "./list";

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

const count = authProcedure.input(inputSchema).query(async ({ input }) => {
  const subject = input?.code?.replace(/[^a-zA-Z]/g, "") || undefined;
  const number = input?.code?.replace(/[^0-9]/g, "") || undefined;
  const title = input?.title || undefined;
  const year = input?.period?.year || undefined;
  const semester = input?.period?.semester || undefined;

  if (input.type === "openedCourse") {
    const result = await prisma.openedCourse.findMany({
      distinct: ["subject", "number"],
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
    });

    return result.length / MAX_COURSE_LIST_SIZE;
  }

  const result = await prisma.course.count({
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
  });

  return result / MAX_COURSE_LIST_SIZE;
});

export default count;
