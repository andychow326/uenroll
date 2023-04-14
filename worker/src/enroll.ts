import { Job } from "bullmq";
import prisma from "./prisma";
import {
  EnrollmentJobData,
  EnrollmentJobEnrollFailType,
  EnrollmentJobEnrollResultType,
  EnrollmentJobType,
} from "./types";

async function handleEnrollJob(job: Job<EnrollmentJobData>) {
  const { userID, courseIDList } = job.data;
  const selectedCourses = await prisma.openedCourse.findMany({
    where: {
      OR: courseIDList.map((x) => ({ id: x })),
    },
    include: {
      _count: { select: { EnrolledCourse: true } },
    },
  });

  const failCourses = new Map<string, EnrollmentJobEnrollFailType>();
  let courses = selectedCourses;

  // Check if some courses are already full
  courses.forEach((course) => {
    // eslint-disable-next-line no-underscore-dangle
    if (course._count.EnrolledCourse === course.capacity) {
      failCourses.set(course.id, EnrollmentJobEnrollFailType.FULL);
    }
  });
  courses = courses.filter((course) => !failCourses.has(course.id));

  // Check if some courses have scheudle collision
  let courseScheduleList: { courseID: string; timeSlotID: string }[] = [];
  courses.forEach((course) => {
    courseScheduleList = courseScheduleList.concat(
      course.timeSlotIds.map((timeSlot) => ({
        courseID: course.id,
        timeSlotID: timeSlot,
      }))
    );
  });
  courseScheduleList = courseScheduleList.filter((a) =>
    courseScheduleList.some(
      (b) => a.courseID !== b.courseID && a.timeSlotID === b.timeSlotID
    )
  );
  const courseScheduleFailIDList = new Set(
    courseScheduleList.map((course) => course.courseID)
  );
  courseScheduleFailIDList.forEach((courseID) =>
    failCourses.set(courseID, EnrollmentJobEnrollFailType.SCHEDULE_CONFLICT)
  );
  courses = courses.filter((course) => !failCourses.has(course.id));

  // Check if course is enrolled before
  const enrolledCourses = await prisma.enrolledCourse.findMany({
    where: {
      OR: courses.map((course) => ({
        AND: [
          { userId: userID },
          {
            openedCourse: {
              AND: [{ subject: course.number, number: course.number }],
            },
          },
        ],
      })),
    },
  });
  enrolledCourses.forEach((course) => {
    failCourses.set(course.courseId, EnrollmentJobEnrollFailType.DUPLICATED);
  });
  courses = courses.filter((course) => !failCourses.has(course.id));

  await prisma.enrolledCourse.createMany({
    data: courses.map((course) => ({ courseId: course.id, userId: userID })),
  });

  await prisma.enrollmentStatus.createMany({
    data: selectedCourses.map((course) => ({
      courseId: course.id,
      userId: userID,
      status: failCourses.has(course.id)
        ? EnrollmentJobEnrollResultType.ERROR
        : EnrollmentJobEnrollResultType.SUCCESS,
      requestType: EnrollmentJobType.ENROLL,
      message:
        failCourses.get(course.id) === EnrollmentJobEnrollFailType.FULL
          ? "Class is full, no vacancy"
          : failCourses.get(course.id) ===
            EnrollmentJobEnrollFailType.SCHEDULE_CONFLICT
          ? "Course conflict exists"
          : failCourses.get(course.id) ===
            EnrollmentJobEnrollFailType.DUPLICATED
          ? "Course not repeatable, cannot enroll again"
          : "Course has been added to your schedule",
    })),
  });

  await prisma.shoppingCart.deleteMany({
    where: {
      OR: courses.map((course) => ({ courseId: course.id, userId: userID })),
    },
  });

  return Object.fromEntries(failCourses);
}

export default handleEnrollJob;
