/* eslint-disable import/prefer-default-export */
import { UserGender, UserProfile } from "./types";

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
