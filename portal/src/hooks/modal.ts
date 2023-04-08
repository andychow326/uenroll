/* eslint-disable import/prefer-default-export */
import { useCallback, useMemo, useState } from "react";
import useAdminActionCreator from "../actions/admin";
import { NEW_USER_PROFILE } from "../constants";
import { UserGender, UserProfile } from "../types";

export function useEditUserModal(userProfile?: UserProfile) {
  const [isCreateNewUser, setIsCreateNewUser] = useState(false);
  const [isEditUserModalOpen, setIsEditUserModalOpen] = useState(false);
  const [currentUserProfile, setCurrentUserProfile] = useState<UserProfile>(
    userProfile ?? NEW_USER_PROFILE
  );
  const { loading, error, createUser } = useAdminActionCreator();

  const onOpenCreateUserModal = useCallback(() => {
    setIsCreateNewUser(true);
    setIsEditUserModalOpen(true);
  }, []);

  const onOpenEditUserModal = useCallback(() => {
    setIsCreateNewUser(false);
    setIsEditUserModalOpen(true);
  }, []);

  const onCloseEditUserModal = useCallback(() => {
    setIsEditUserModalOpen(false);
  }, []);

  const onSave = useCallback(() => {
    createUser(currentUserProfile).finally(() => {
      onCloseEditUserModal();
      setCurrentUserProfile(NEW_USER_PROFILE);
    });
  }, [createUser, currentUserProfile, onCloseEditUserModal]);

  const onChangeID = useCallback((value: string) => {
    setCurrentUserProfile((profile) => ({
      ...profile,
      id: value,
    }));
  }, []);

  const onChangeFirstName = useCallback((value: string) => {
    setCurrentUserProfile((profile) => ({
      ...profile,
      firstName: value,
    }));
  }, []);

  const onChangeLastName = useCallback((value: string) => {
    setCurrentUserProfile((profile) => ({
      ...profile,
      lastName: value,
    }));
  }, []);

  const onChangeEmail = useCallback((value: string) => {
    setCurrentUserProfile((profile) => ({
      ...profile,
      email: value,
    }));
  }, []);

  const onChangeIsAdmin = useCallback((value: boolean) => {
    setCurrentUserProfile((profile) => ({
      ...profile,
      isAdmin: value,
    }));
  }, []);

  const onChangeDateOfBirth = useCallback((value: string) => {
    setCurrentUserProfile((profile) => ({
      ...profile,
      dateOfBirth: value,
    }));
  }, []);

  const onChangePhoneNumber = useCallback((value: string) => {
    setCurrentUserProfile((profile) => ({
      ...profile,
      phoneNumber: value,
    }));
  }, []);

  const onChangeGender = useCallback((value: UserGender) => {
    setCurrentUserProfile((profile) => ({
      ...profile,
      gender: value,
    }));
  }, []);

  const onChangeMajor = useCallback((value: string) => {
    setCurrentUserProfile((profile) => ({
      ...profile,
      major: value,
    }));
  }, []);

  const onChangeAddress = useCallback((value: string) => {
    setCurrentUserProfile((profile) => ({
      ...profile,
      address: value,
    }));
  }, []);

  return useMemo(
    () => ({
      loading,
      error,
      onSave,
      isCreateNewUser,
      isEditUserModalOpen,
      onOpenCreateUserModal,
      onOpenEditUserModal,
      onCloseEditUserModal,
      currentUserProfile,
      onChangeID,
      onChangeFirstName,
      onChangeLastName,
      onChangeEmail,
      onChangeIsAdmin,
      onChangeDateOfBirth,
      onChangePhoneNumber,
      onChangeGender,
      onChangeMajor,
      onChangeAddress,
    }),
    [
      loading,
      error,
      onSave,
      isCreateNewUser,
      isEditUserModalOpen,
      onOpenCreateUserModal,
      onOpenEditUserModal,
      onCloseEditUserModal,
      currentUserProfile,
      onChangeID,
      onChangeFirstName,
      onChangeLastName,
      onChangeEmail,
      onChangeIsAdmin,
      onChangeDateOfBirth,
      onChangePhoneNumber,
      onChangeGender,
      onChangeMajor,
      onChangeAddress,
    ]
  );
}
