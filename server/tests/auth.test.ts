import {
  AuthErrorInvalidCredentials,
  AuthErrorUnauthorized,
  AuthErrorUserNotFound,
} from "../src/exceptions";
import prisma from "../src/prisma";
import MockAPIRequest from "./helpers/MockAPIRequest";
import ResetDatabase from "./helpers/ResetDatabase";

beforeEach((done) => {
  ResetDatabase().finally(done);
});
afterEach(async () => prisma.$disconnect());

describe("auth", () => {
  describe("login", () => {
    it("should login successfully with correct userID and password", async () => {
      const mockAPIRequest = MockAPIRequest();
      const sessionID = await mockAPIRequest.auth.login({
        userID: "admin",
        password: "admin",
      });
      expect(sessionID).toBeTruthy();
    });

    it("should reject login with invalid userID or password", async () => {
      const mockAPIRequest = MockAPIRequest();
      await expect(
        mockAPIRequest.auth.login({
          userID: "random",
          password: "random",
        })
      ).rejects.toThrowError(AuthErrorInvalidCredentials);
    });
  });

  describe("forgotPassword", () => {
    it("should send email with valid user ID", async () => {
      const mockAPIRequest = MockAPIRequest();
      const response = (await mockAPIRequest.auth.forgotPassword("admin")) as {
        email: string;
        accessToken: string;
      };
      expect(response.email).toEqual("admin@uenroll.com");
      expect(response.accessToken).toBeTruthy();
    });

    it("should reject sending email with invalid user ID", async () => {
      const mockAPIRequest = MockAPIRequest();
      await expect(
        mockAPIRequest.auth.forgotPassword("random")
      ).rejects.toThrowError(AuthErrorUserNotFound);
    });
  });

  describe("resetPassword", () => {
    const mockAPIRequest = MockAPIRequest();

    async function getAccessToken() {
      const response = (await mockAPIRequest.auth.forgotPassword("admin")) as {
        email: string;
        accessToken: string;
      };
      const { accessToken } = response;
      return accessToken;
    }

    it("should reset user password with valid access token and matched passwords", async () => {
      const accessToken = await getAccessToken();
      const status = await mockAPIRequest.auth.resetPassword({
        password: "newPassword",
        confirmPassword: "newPassword",
        accessToken,
      });
      expect(status).toEqual(true);
    });

    it("should prompt user when input passwords are not matched", async () => {
      const accessToken = await getAccessToken();
      await expect(
        mockAPIRequest.auth.resetPassword({
          password: "newPassword",
          confirmPassword: "wrongPassword",
          accessToken,
        })
      ).rejects.toThrowErrorMatchingInlineSnapshot(`
"[
  {
    "code": "custom",
    "message": "Passwords must be the same",
    "path": [
      "confirmPassword"
    ]
  }
]"
`);
    });

    it("should reject reset password with invalid access token no matter with matched passwords or not", async () => {
      await expect(
        mockAPIRequest.auth.resetPassword({
          password: "newPassword",
          confirmPassword: "newPassword",
          accessToken: "wrongAccessToken",
        })
      ).rejects.toThrowError(AuthErrorUnauthorized);
    });
  });
});
