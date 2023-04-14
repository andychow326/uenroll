-- CreateEnum
CREATE TYPE "StatusType" AS ENUM ('SUCCESS', 'ERROR');

-- CreateEnum
CREATE TYPE "RequestType" AS ENUM ('ENROLL', 'DROP');

-- CreateTable
CREATE TABLE "enrollment_status" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "course_id" TEXT NOT NULL,
    "status" "StatusType" NOT NULL,
    "request_type" "RequestType" NOT NULL,
    "message" TEXT NOT NULL,

    CONSTRAINT "enrollment_status_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "enrollment_status" ADD CONSTRAINT "enrollment_status_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "enrollment_status" ADD CONSTRAINT "enrollment_status_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "opened_course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
