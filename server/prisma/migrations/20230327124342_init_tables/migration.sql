-- CreateEnum
CREATE TYPE "DayOfWeek" AS ENUM ('MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY');

-- CreateEnum
CREATE TYPE "WorkerAction" AS ENUM ('ENROLL', 'DROP', 'SWAP');

-- CreateEnum
CREATE TYPE "WorkerStatus" AS ENUM ('PENDING', 'PROCESSING', 'SUCCESS', 'FULL');

-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "is_admin" BOOLEAN NOT NULL DEFAULT false,
    "email" TEXT NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "course" (
    "subject" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "career" TEXT NOT NULL,
    "units" DOUBLE PRECISION NOT NULL,
    "description" TEXT,
    "learning_outcome" TEXT,
    "syllabus" TEXT,
    "required_readings" TEXT,
    "recommended_readings" TEXT,

    CONSTRAINT "course_pkey" PRIMARY KEY ("subject","number")
);

-- CreateTable
CREATE TABLE "time_slot" (
    "id" TEXT NOT NULL,
    "start" TIMESTAMP(3) NOT NULL,
    "end" TIMESTAMP(3) NOT NULL,
    "day_of_week" "DayOfWeek" NOT NULL,

    CONSTRAINT "time_slot_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "opened_course" (
    "id" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "section" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "semester" TEXT NOT NULL,
    "time_slot_id" TEXT NOT NULL,
    "venue" TEXT NOT NULL,
    "lecturer" TEXT NOT NULL,
    "outline" BYTEA,
    "capacity" INTEGER NOT NULL,

    CONSTRAINT "opened_course_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "shopping_cart" (
    "user_id" TEXT NOT NULL,
    "course_id" TEXT NOT NULL,

    CONSTRAINT "shopping_cart_pkey" PRIMARY KEY ("user_id","course_id")
);

-- CreateTable
CREATE TABLE "recently_viewed" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "course_id" TEXT NOT NULL,

    CONSTRAINT "recently_viewed_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "enrolled_course" (
    "user_id" TEXT NOT NULL,
    "course_id" TEXT NOT NULL,

    CONSTRAINT "enrolled_course_pkey" PRIMARY KEY ("user_id","course_id")
);

-- CreateTable
CREATE TABLE "worker_queue" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "course_id" TEXT NOT NULL,
    "action" "WorkerAction" NOT NULL,
    "status" "WorkerStatus" NOT NULL,

    CONSTRAINT "worker_queue_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "opened_course" ADD CONSTRAINT "opened_course_subject_number_fkey" FOREIGN KEY ("subject", "number") REFERENCES "course"("subject", "number") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "opened_course" ADD CONSTRAINT "opened_course_time_slot_id_fkey" FOREIGN KEY ("time_slot_id") REFERENCES "time_slot"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "shopping_cart" ADD CONSTRAINT "shopping_cart_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "shopping_cart" ADD CONSTRAINT "shopping_cart_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "opened_course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recently_viewed" ADD CONSTRAINT "recently_viewed_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recently_viewed" ADD CONSTRAINT "recently_viewed_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "opened_course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "enrolled_course" ADD CONSTRAINT "enrolled_course_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "enrolled_course" ADD CONSTRAINT "enrolled_course_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "opened_course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "worker_queue" ADD CONSTRAINT "worker_queue_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "worker_queue" ADD CONSTRAINT "worker_queue_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "opened_course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
