import { Job, Worker } from "bullmq";
import dotenv from "dotenv";
import handleDropJob from "./drop";
import handleEnrollJob from "./enroll";
import { EnrollmentJobData, EnrollmentJobType } from "./types";

dotenv.config();

const worker = new Worker(
  "enrollment",
  async (job: Job<EnrollmentJobData>) => {
    switch (job.data.type) {
      case EnrollmentJobType.ENROLL:
        return handleEnrollJob(job);
      case EnrollmentJobType.DROP:
        return handleDropJob(job);
      default:
        return Promise.resolve();
    }
  },
  {
    connection: {
      host: process.env.REDIS_HOST,
      port: Number(process.env.REDIS_PORT),
    },
  }
);

process.on("SIGINT", async () => {
  await worker.close();
});
