import { Course, OpenedCourse, UserGender, UserProfile } from "./types";

export const NEW_USER_PROFILE: UserProfile = {
  id: "",
  firstName: "",
  lastName: "",
  email: "",
  isAdmin: false,
  dateOfBirth: "",
  phoneNumber: "",
  gender: UserGender.other,
  major: "",
  address: "",
} as const;

export const NEW_COURSE: Course = {
  subject: "",
  number: "",
  title: "",
  career: "Undergraduate",
  units: 3.0,
  description: "",
  learningOutcome: "",
  syllabus: "",
  requiredReadings: "",
  recommendedReadings: "",
  openedCourse: [],
};

export const DEFAULT_OPENED_COURSE: OpenedCourse = {
  id: "",
  subject: "",
  number: "",
  section: "",
  year: new Date().getFullYear(),
  semester: "",
  timeSlotIds: [],
  venue: "",
  instructor: "",
  openSeats: 0,
  capacity: 0,
  course: NEW_COURSE,
};

export const NEW_OPENED_COURSE = (course: Course): OpenedCourse => ({
  id: "",
  subject: course.subject,
  number: course.number,
  section: "",
  year: new Date().getFullYear(),
  semester: "",
  timeSlotIds: [],
  venue: "",
  instructor: "",
  openSeats: 0,
  capacity: 0,
  course,
});

export const TIME_SLOTS_PER_DAY = 10;
