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

export type SearchBarItemType = "textField" | "dropdown";

export type SearchBarItemTextField = {
  type: "textField";
  labelID: string;
  value: string;
  onChange: (value: string) => void;
};

export type SearchBarItemDropdownOptions = {
  text: string;
  value: string;
};

export type SearchBarItemDropdown = {
  type: "dropdown";
  labelID: string;
  value: string;
  options: SearchBarItemDropdownOptions[];
  onChange: (value: string) => void;
};

export type SearchBarItem = SearchBarItemTextField | SearchBarItemDropdown;

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

export enum CourseType {
  course = "course",
  openedCourse = "openedCourse",
}

export type Course = {
  type: CourseType.course;
  subject: string;
  number: string;
  title: string;
  career: string;
  units: number;
  description?: string;
  learningOutcome?: string;
  syllabus?: string;
  requiredReadings?: string;
  recommendedReadings?: string;
  openedCourse: OpenedCourse[];
};

export type OpenedCourse = {
  type: CourseType.openedCourse;
  id: string;
  subject: string;
  number: string;
  section: string;
  year: number;
  semester: string;
  timeSlotIds: string[];
  venue: string;
  lecturer: string;
  outline?: string;
  capacity: number;
  course: Course;
};

export type CourseListItem<T> = T extends CourseType.course
  ? Course
  : T extends CourseType.openedCourse
  ? OpenedCourse
  : never;

export type CoursePeriod = {
  year: number;
  semester: string;
};

export type CourseListFilter = {
  code: string;
  title: string;
  period?: CoursePeriod;
  offset?: number;
};
