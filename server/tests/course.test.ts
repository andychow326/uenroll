import prisma from "../src/prisma";
import { redisClient, setupRedisClient } from "../src/redis";
import MockAPIRequest from "./helpers/MockAPIRequest";
import ResetDatabase from "./helpers/ResetDatabase";

beforeAll(() => setupRedisClient());
beforeEach(() => ResetDatabase());
afterAll(async () =>
  Promise.all([prisma.$disconnect(), redisClient.disconnect()])
);

describe("course", () => {
  describe("timeSlot", () => {
    it("should retrieve available time slot list", async () => {
      const mockAPIRequest = MockAPIRequest();
      await expect(mockAPIRequest.course.timeSlot()).resolves.toBeTruthy();
    });
  });
});
