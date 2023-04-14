/* eslint-disable import/prefer-default-export */
import { Queue } from "bullmq";
import { EnrollmentJobData } from "./types";

export const enrollmentQueue = new Queue<EnrollmentJobData>("enrollment", {
  connection: {
    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT),
  },
});
