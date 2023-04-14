import { Job } from "bullmq";
import prisma from "./prisma";
import {
  EnrollmentJobData,
  EnrollmentJobEnrollResultType,
  EnrollmentJobType,
} from "./types";

async function handleDropJob(job: Job<EnrollmentJobData>) {
  const { userID, courseIDList } = job.data;
  await prisma.enrolledCourse.deleteMany({
    where: {
      OR: courseIDList.map((courseID) => ({
        courseId: courseID,
        userId: userID,
      })),
    },
  });

  await prisma.enrollmentStatus.createMany({
    data: courseIDList.map((courseID) => ({
      courseId: courseID,
      userId: userID,
      status: EnrollmentJobEnrollResultType.SUCCESS,
      requestType: EnrollmentJobType.DROP,
      message: "Course has been removed from your schedule",
    })),
  });
}

export default handleDropJob;
