<<<<<<< Updated upstream
import { CSSProperties } from "react";

export enum AuthMode {
  login = "login",
  forgotPassword = "forgotPassword",
  forgotPasswordConfirmation = "forgotPasswordConfirmation",
  resetPassword = "resetPassword",
  expiredAccessToken = "expiredAccessToken",
}

export enum UserGender {
  male = "MALE",
  female = "FEMALE",
  other = "OTHER",
}

export enum UserRole {
  student = "STUDENT",
  admin = "ADMIN",
}

export enum SearchParams {
  accessToken = "accessToken",
}

export type UserProfile = {
  id: string;
  isVerified?: boolean;
  firstName: string;
  lastName: string;
  email: string;
  isAdmin: boolean;
  dateOfBirth: string;
  phoneNumber: string;
  gender: UserGender;
  major: string;
  address: string;
};

export type SearchBarItem = {
  labelID: string;
  type: "textField" | "dropdown";
  value: string;
  onChange: (value: string) => void;
};

export type TableColumnOption = {
  headerLabelID: string;
  width: number;
};

export type TableRowCellOption = {
  styles: CSSProperties;
  value: string;
};

export type UserProfileListFilter = {
  userID?: string;
  username?: string;
  cursor?: string;
};
=======
import { CSSProperties } from "react";

export enum AuthMode {
  login = "login",
  forgotPassword = "forgotPassword",
  resetPassword = "resetPassword",
  expiredAccessToken = "expiredAccessToken",
}

export enum UserGender {
  male = "MALE",
  female = "FEMALE",
  other = "OTHER",
}

export enum UserRole {
  student = "STUDENT",
  admin = "ADMIN",
}

export enum SearchParams {
  accessToken = "accessToken",
}

export type UserProfile = {
  id: string;
  isVerified?: boolean;
  firstName: string;
  lastName: string;
  email: string;
  isAdmin: boolean;
  dateOfBirth: string;
  phoneNumber: string;
  gender: UserGender;
  major: string;
  address: string;
};

export type CourseProfile = {
  subject: string;
  number: string;
  title: string;
  career: string;
  units: number;
  description: string;
  learningOutcome: string;
  syllabus: string;
  requiredReadings: string
  recommendedReadings: string;
  openedCourse: OpenedCourseProfile[];
};

export type OpenedCourseProfile = {
  id: string;
  subject: string;
  number: string;
  section: string;
  year: number;
  semester: string;
  timeSlotID: string;
  venue: string;
  lecturer: string;
  capacity: number;
};

export type SearchBarItem = {
  labelID: string;
  type: "textField" | "dropdown";
  value: string;
  onChange: (value: string) => void;
};

export type TableColumnOption = {
  headerLabelID: string;
  width: number;
};

export type TableRowCellOption = {
  styles: CSSProperties;
  value: string;
};

export type UserProfileListFilter = {
  userID?: string;
  username?: string;
  cursor?: string;
};

export type CourseProfileListFilter = {
  courseID?: string;
  coursename?: string;
  cursor?: string;
};

export type OpenedCourseProfileListFilter = {
  courseID?: string;
  cursor?: string;
}
>>>>>>> Stashed changes
