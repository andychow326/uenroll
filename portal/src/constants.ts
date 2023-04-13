import { Course, UserGender, UserProfile } from "./types";

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
