import React, { ReactNode } from "react";
import { FormattedMessage } from "react-intl";
import { Button, Modal } from "semantic-ui-react";

interface ConfirmModalProps {
  loading?: boolean;
  headerTextID?: string;
  children: ReactNode;
  isOpen: boolean;
  confirmTextID?: string;
  cancelTextID?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmModal: React.FC<ConfirmModalProps> = (props) => {
  const {
    loading,
    headerTextID,
    children,
    isOpen,
    confirmTextID,
    cancelTextID,
    onConfirm,
    onCancel,
  } = props;

  return (
    <Modal size="mini" open={isOpen} onClose={onCancel}>
      {headerTextID && (
        <Modal.Header>
          <FormattedMessage id={headerTextID} />
        </Modal.Header>
      )}
      <Modal.Content>{children}</Modal.Content>
      <Modal.Actions>
        <Button positive loading={loading} onClick={onConfirm}>
          <FormattedMessage
            id={confirmTextID ?? "ConfirmModal.button.confirm.label"}
          />
        </Button>
        <Button negative loading={loading} onClick={onCancel}>
          <FormattedMessage
            id={cancelTextID ?? "ConfirmModal.button.cancel.label"}
          />
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default ConfirmModal;
