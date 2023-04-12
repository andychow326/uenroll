import prisma from "../../prisma";
import { authProcedure } from "../../procedure";

const availablePeriod = authProcedure.query(async () => {
  const periods = await prisma.openedCourse.findMany({
    select: {
      year: true,
      semester: true,
    },
    distinct: ["year", "semester"],
    orderBy: [{ year: "desc" }, { semester: "desc" }],
  });

  return periods;
});

export default availablePeriod;
