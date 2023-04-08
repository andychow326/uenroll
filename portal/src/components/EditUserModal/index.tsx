import React, { useMemo } from "react";
import { FormattedMessage } from "react-intl";
import { Button, Checkbox, Modal } from "semantic-ui-react";
import { useCheckboxChange, useTextFieldChange } from "../../hooks/component";
import type { Error } from "../../trpc";
import { UserGender, UserProfile, UserRole } from "../../types";
import InputWithErrorField from "../InputWithErrorField";

import styles from "./styles.module.css";

interface EditUserModalProps {
  loading: boolean;
  error: Error | null;
  isCreateNewUser: boolean;
  isOpen: boolean;
  userProfile: UserProfile;
  onClose: () => void;
  onChangeID: (value: string) => void;
  onChangeFirstName: (value: string) => void;
  onChangeLastName: (value: string) => void;
  onChangeEmail: (value: string) => void;
  onChangeIsAdmin: (value: boolean) => void;
  onChangeDateOfBirth: (value: string) => void;
  onChangePhoneNumber: (value: string) => void;
  onChangeGender: (value: UserGender) => void;
  onChangeMajor: (value: string) => void;
  onChangeAddress: (value: string) => void;
  onSave: () => void;
}

const EditUserModal: React.FC<EditUserModalProps> = (props) => {
  const {
    loading,
    error,
    isCreateNewUser = false,
    isOpen,
    userProfile,
    onClose,
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
    onSave,
  } = props;

  const onChangeIDField = useTextFieldChange(onChangeID);
  const onChangeFirstNameField = useTextFieldChange(onChangeFirstName);
  const onChangeLastNameField = useTextFieldChange(onChangeLastName);
  const onChangeEmailField = useTextFieldChange(onChangeEmail);
  const onChangePhoneNumberField = useTextFieldChange(onChangePhoneNumber);
  const onChangeMajorField = useTextFieldChange(onChangeMajor);
  const onChangeAddressField = useTextFieldChange(onChangeAddress);
  const onChangeDateOfBirthField = useTextFieldChange(onChangeDateOfBirth);
  const onChangeGenderField = useCheckboxChange(onChangeGender);

  const commonInputFieldProps = useMemo(
    () => ({
      loading,
      focus: true,
      errorData: error,
    }),
    [error, loading]
  );

  return (
    <Modal size="tiny" open={isOpen} onClose={onClose}>
      <Modal.Header>
        <FormattedMessage
          id={
            isCreateNewUser
              ? "EditUserModal.header.create-user"
              : "EditUserModal.header.edit-user"
          }
        />
      </Modal.Header>
      <Modal.Content>
        <div className={styles.label}>
          <FormattedMessage id="EditUserModal.input.first-name.label" />
        </div>
        <InputWithErrorField
          {...commonInputFieldProps}
          name="firstName"
          value={userProfile.firstName}
          onChange={onChangeFirstNameField}
        />

        <div className={styles.label}>
          <FormattedMessage id="EditUserModal.input.last-name.label" />
        </div>
        <InputWithErrorField
          {...commonInputFieldProps}
          name="lastName"
          value={userProfile.lastName}
          onChange={onChangeLastNameField}
        />

        <div className={styles.label}>
          <FormattedMessage id="EditUserModal.input.dof.label" />
        </div>
        <InputWithErrorField
          {...commonInputFieldProps}
          type="date"
          name="dateOfBirth"
          value={userProfile.dateOfBirth}
          onChange={onChangeDateOfBirthField}
        />

        <div className={styles.label}>
          <FormattedMessage id="EditUserModal.input.gender.label" />
        </div>
        <div className={styles.checkbox}>
          {Object.values(UserGender).map((gender) => (
            <Checkbox
              radio
              label={gender}
              checked={userProfile.gender === gender}
              value={gender}
              onChange={onChangeGenderField}
            />
          ))}
        </div>

        {isCreateNewUser && (
          <>
            <div className={styles.label}>
              <FormattedMessage id="EditUserModal.input.role.label" />
            </div>
            <div className={styles.checkbox}>
              <Checkbox
                radio
                label={UserRole.student}
                checked={!userProfile.isAdmin}
                onClick={() => onChangeIsAdmin(false)}
              />
              <Checkbox
                radio
                label={UserRole.admin}
                checked={userProfile.isAdmin}
                onClick={() => onChangeIsAdmin(true)}
              />
            </div>
          </>
        )}

        {userProfile.isAdmin ? (
          <>
            <div className={styles.label}>
              <FormattedMessage id="EditUserModal.input.user-id.label" />
            </div>

            <InputWithErrorField
              {...commonInputFieldProps}
              name="id"
              value={userProfile.id}
              onChange={onChangeIDField}
            />
          </>
        ) : (
          <>
            <div className={styles.label}>
              <FormattedMessage id="EditUserModal.input.major.label" />
            </div>

            <InputWithErrorField
              {...commonInputFieldProps}
              name="major"
              value={userProfile.major}
              onChange={onChangeMajorField}
            />
          </>
        )}

        <div className={styles.label}>
          <FormattedMessage id="EditUserModal.input.email.label" />
        </div>
        <InputWithErrorField
          {...commonInputFieldProps}
          name="email"
          value={userProfile.email}
          onChange={onChangeEmailField}
        />

        <div className={styles.label}>
          <FormattedMessage id="EditUserModal.input.phone-number.label" />
        </div>
        <InputWithErrorField
          {...commonInputFieldProps}
          name="phoneNumber"
          value={userProfile.phoneNumber}
          onChange={onChangePhoneNumberField}
        />

        <div className={styles.label}>
          <FormattedMessage id="EditUserModal.input.address.label" />
        </div>
        <InputWithErrorField
          {...commonInputFieldProps}
          name="address"
          value={userProfile.address}
          onChange={onChangeAddressField}
        />
        <Button color="green" onClick={onSave} loading={loading}>
          <FormattedMessage id="EditUserModal.save-button.label" />
        </Button>
      </Modal.Content>
    </Modal>
  );
};

export default EditUserModal;
