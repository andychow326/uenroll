export enum EnrollmentJobType {
  ENROLL = "ENROLL",
  DROP = "DROP",
}

export type EnrollmentJobData = {
  type: EnrollmentJobType;
  userID: string;
  courseIDList: string[];
};

export enum EnrollmentJobEnrollFailType {
  FULL = "FULL",
  SCHEDULE_CONFLICT = "SCHEDULE_CONFLICT",
  DUPLICATED = "DUPLICATED",
}

export enum EnrollmentJobEnrollResultType {
  SUCCESS = "SUCCESS",
  ERROR = "ERROR",
}
