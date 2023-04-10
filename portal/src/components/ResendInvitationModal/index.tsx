import React from "react";
import { FormattedMessage } from "react-intl";
import { UserProfile } from "../../types";
import ConfirmModal from "../ConfirmModal";

interface ResendInvitationModalProps {
  loading?: boolean;
  isOpen: boolean;
  userProfile: UserProfile | null;
  onConfirm: () => void;
  onCancel: () => void;
}

const ResendInvitationModal: React.FC<ResendInvitationModalProps> = (props) => {
  const { loading, isOpen, userProfile, onConfirm, onCancel } = props;

  return (
    <ConfirmModal
      loading={loading}
      isOpen={isOpen}
      headerTextID="ResendInvitationModal.header"
      onConfirm={onConfirm}
      onCancel={onCancel}
    >
      <p>
        <FormattedMessage id="ResendInvitationModal.description.start" />
      </p>
      <p>
        <b>
          <FormattedMessage
            id="ResendInvitationModal.description.target"
            values={{
              firstName: userProfile?.firstName,
              lastName: userProfile?.lastName,
              email: userProfile?.email,
            }}
          />
        </b>
      </p>
    </ConfirmModal>
  );
};

export default ResendInvitationModal;
