import { AuthErrorUnauthorized } from "../src/exceptions";
import prisma from "../src/prisma";
import { redisClient, setupRedisClient } from "../src/redis";
import MockAPIRequest from "./helpers/MockAPIRequest";
import MockUser from "./helpers/MockUser";
import ResetDatabase from "./helpers/ResetDatabase";

beforeAll(() => setupRedisClient());
beforeEach(() => ResetDatabase());
afterAll(async () =>
  Promise.all([prisma.$disconnect(), redisClient.disconnect()])
);

describe("user", () => {
  describe("validateSession", () => {
    it("should accept if session is valid", async () => {
      const mockGuestAPIRequest = MockAPIRequest();
      const sessionID = await mockGuestAPIRequest.auth.login({
        userID: "admin",
        password: "admin",
      });

      const user = await MockUser(sessionID);
      const mockUserAPIRequest = MockAPIRequest(user);
      const status = await mockUserAPIRequest.user.validateSession();
      expect(status).toEqual(true);
    });

    it("should reject if session is invalid", async () => {
      const invalidSessionID = "invalidSessionID";
      const user = await MockUser(invalidSessionID);
      const mockAPIRequest = MockAPIRequest(user);
      await expect(mockAPIRequest.user.validateSession()).rejects.toThrowError(
        AuthErrorUnauthorized
      );
    });
  });
});
