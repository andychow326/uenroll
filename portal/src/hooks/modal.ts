/* eslint-disable import/prefer-default-export */
import { useCallback, useMemo, useState } from "react";
import useAdminActionCreator from "../actions/admin";
import { NEW_USER_PROFILE } from "../constants";
import { UserGender, UserProfile } from "../types";

export function useEditUserModal(
  actions: Partial<ReturnType<typeof useAdminActionCreator>>
) {
  const [isCreateNewUser, setIsCreateNewUser] = useState(false);
  const [isEditUserModalOpen, setIsEditUserModalOpen] = useState(false);
  const [currentUserProfile, setCurrentUserProfile] =
    useState<UserProfile>(NEW_USER_PROFILE);

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
    setCurrentUserProfile(NEW_USER_PROFILE);
    actions?.clearQuery?.();
  }, [actions]);

  const onEdit = useCallback(
    (profile: UserProfile) => () => {
      setCurrentUserProfile(profile);
      onOpenEditUserModal();
    },
    [onOpenEditUserModal]
  );

  const onSave = useCallback(async () => {
    let success: boolean | undefined;
    if (isCreateNewUser) {
      success = await actions?.createUser?.(currentUserProfile);
    } else {
      success = await actions?.editUser?.(currentUserProfile);
    }

    if (success) {
      // TODO: Should show success message bar
      onCloseEditUserModal();
      setCurrentUserProfile(NEW_USER_PROFILE);
    }
  }, [actions, currentUserProfile, isCreateNewUser, onCloseEditUserModal]);

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
      onEdit,
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
      onEdit,
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

export function useResendInvitationModal(
  actions: Partial<ReturnType<typeof useAdminActionCreator>>
) {
  const [isResendInvitationModalOpen, setIsResendInvitationModalOpen] =
    useState(false);
  const [currentUserProfile, setCurrentUserProfile] =
    useState<UserProfile | null>(null);

  const onOpenResendInvitationModal = useCallback(
    (userProfile: UserProfile) => () => {
      setCurrentUserProfile(userProfile);
      setIsResendInvitationModalOpen(true);
    },
    []
  );

  const onCloseResendInvitationModal = useCallback(() => {
    setIsResendInvitationModalOpen(false);
    setCurrentUserProfile(null);
  }, []);

  const onResendInvitation = useCallback(() => {
    if (currentUserProfile != null) {
      actions?.sendInvitation?.(currentUserProfile.id).finally(() => {
        onCloseResendInvitationModal();
      });
    }
  }, [actions, currentUserProfile, onCloseResendInvitationModal]);

  return useMemo(
    () => ({
      currentUserProfile,
      isResendInvitationModalOpen,
      onOpenResendInvitationModal,
      onCloseResendInvitationModal,
      onResendInvitation,
    }),
    [
      currentUserProfile,
      isResendInvitationModalOpen,
      onOpenResendInvitationModal,
      onCloseResendInvitationModal,
      onResendInvitation,
    ]
  );
}
