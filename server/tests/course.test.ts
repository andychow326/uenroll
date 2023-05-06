import { CourseErrorCourseAlreadyExists } from "../src/exceptions";
import prisma from "../src/prisma";
import MockAPIRequest from "./helpers/MockAPIRequest";
import ResetDatabase from "./helpers/ResetDatabase";

beforeEach((done) => {
  ResetDatabase().finally(done);
});
afterEach(async () => prisma.$disconnect());

describe("course", () => {
  const mockAdminAPIRequest = MockAPIRequest({
    user: { id: "admin", isAdmin: true },
    sessionID: "sessionID",
  });

  describe("timeSlot", () => {
    it("should retrieve available time slot list", async () => {
      const mockAPIRequest = MockAPIRequest();
      await expect(mockAPIRequest.course.timeSlot()).resolves.toBeTruthy();
    });
  });

  describe("create", () => {
    it("should create a new course with valid inputs", async () => {
      const newCourse = {
        subject: "CSCI",
        number: "9999",
        title: "New Course",
        career: "Undergraduate",
        units: 3.0,
        description: "",
        learningOutcome: "",
        syllabus: "",
        requiredReadings: "",
        recommendedReadings: "",
      };
      await expect(
        mockAdminAPIRequest.course.create(newCourse)
      ).resolves.not.toThrowError();
    });

    it("should reject request with invalid inputs", async () => {
      const newCourse = {
        subject: "",
        number: "",
        title: "",
        career: "",
        units: 0,
        description: "",
        learningOutcome: "",
        syllabus: "",
        requiredReadings: "",
        recommendedReadings: "",
      };
      await expect(mockAdminAPIRequest.course.create(newCourse)).rejects
        .toThrowErrorMatchingInlineSnapshot(`
"[
  {
    "code": "too_small",
    "minimum": 4,
    "type": "string",
    "inclusive": true,
    "exact": true,
    "message": "String must contain exactly 4 character(s)",
    "path": [
      "subject"
    ]
  },
  {
    "code": "too_small",
    "minimum": 4,
    "type": "string",
    "inclusive": true,
    "exact": true,
    "message": "String must contain exactly 4 character(s)",
    "path": [
      "number"
    ]
  },
  {
    "code": "too_small",
    "minimum": 1,
    "type": "string",
    "inclusive": true,
    "exact": false,
    "message": "String must contain at least 1 character(s)",
    "path": [
      "title"
    ]
  },
  {
    "code": "too_small",
    "minimum": 0,
    "type": "number",
    "inclusive": false,
    "exact": false,
    "message": "Number must be greater than 0",
    "path": [
      "units"
    ]
  }
]"
`);
    });

    it("should avoid creating duplicate course", async () => {
      const newCourse = {
        subject: "CSCI",
        number: "3100",
        title: "Software Engineering",
        career: "Undergraduate",
        units: 3.0,
        description: "",
        learningOutcome: "",
        syllabus: "",
        requiredReadings: "",
        recommendedReadings: "",
      };
      await expect(
        mockAdminAPIRequest.course.create(newCourse)
      ).rejects.toThrowError(CourseErrorCourseAlreadyExists);
    });
  });

  describe("createSection", () => {
    it("should create a new course section with valid inputs", async () => {
      const newCourseSection = {
        id: "",
        subject: "CSCI",
        number: "3100",
        section: "A",
        year: 2023,
        semester: "2",
        timeSlotIds: ["M1", "M2", "T4"],
        venue: "Shaw",
        instructor: "Prof. Michael Lyu",
        capacity: 200,
      };
      await expect(
        mockAdminAPIRequest.course.createSection(newCourseSection)
      ).resolves.not.toThrowError();
    });
  });
});
