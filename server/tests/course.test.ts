import prisma from "../src/prisma";
import MockAPIRequest from "./helpers/MockAPIRequest";
import ResetDatabase from "./helpers/ResetDatabase";

beforeEach((done) => {
  ResetDatabase().finally(done);
});
afterEach(async () => prisma.$disconnect());

describe("course", () => {
  describe("timeSlot", () => {
    it("should retrieve available time slot list", async () => {
      const mockAPIRequest = MockAPIRequest();
      await expect(mockAPIRequest.course.timeSlot()).resolves.toBeTruthy();
    });
  });
});
