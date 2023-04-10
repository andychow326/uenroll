import React from "react";
import { FormattedDate, FormattedMessage } from "react-intl";

import { Button } from "semantic-ui-react";
import styles from "./styles.module.css";

interface UserTableDetailsCellProps {
  firstName: string;
  lastName: string;
  email: string;
  dateOfBirth: string;
  phoneNumber: string;
  gender: string;
  major: string;
  address: string;
  onEdit: () => void;
}

const UserTableDetailsCell: React.FC<UserTableDetailsCellProps> = (props) => {
  const {
    firstName,
    lastName,
    email,
    dateOfBirth,
    phoneNumber,
    gender,
    major,
    address,
    onEdit,
  } = props;

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.header} style={{ minWidth: 1000 }}>
          <div style={{ width: 100 }}>
            <FormattedMessage id="UserTableDetailsCell.first-name.label" />
          </div>
          <div style={{ width: 100 }}>
            <FormattedMessage id="UserTableDetailsCell.last-name.label" />
          </div>
          <div style={{ width: 150 }}>
            <FormattedMessage id="UserTableDetailsCell.email.label" />
          </div>
          <div style={{ width: 100 }}>
            <FormattedMessage id="UserTableDetailsCell.dof.label" />
          </div>
          <div style={{ width: 100 }}>
            <FormattedMessage id="UserTableDetailsCell.phone-number.label" />
          </div>
          <div style={{ width: 100 }}>
            <FormattedMessage id="UserTableDetailsCell.gender.label" />
          </div>
          <div style={{ width: 150 }}>
            <FormattedMessage id="UserTableDetailsCell.major.label" />
          </div>
          <div style={{ width: 200 }}>
            <FormattedMessage id="UserTableDetailsCell.address.label" />
          </div>
        </div>
        <div className={styles.body} style={{ minWidth: 1000 }}>
          <div style={{ width: 100 }}>{firstName}</div>
          <div style={{ width: 100 }}>{lastName}</div>
          <div style={{ width: 150 }}>{email}</div>
          <div style={{ width: 100 }}>
            <FormattedDate value={dateOfBirth} />
          </div>
          <div style={{ width: 100 }}>{phoneNumber}</div>
          <div style={{ width: 100 }}>{gender}</div>
          <div style={{ width: 150 }}>{major}</div>
          <div style={{ width: 200 }}>{address}</div>
        </div>
      </div>
      <div className={styles.footer}>
        <Button color="blue" onClick={onEdit}>
          <FormattedMessage id="UserTableDetailsCell.edit-button.label" />
        </Button>
        {/* TODO: Implement delete button */}
        <Button color="red">
          <FormattedMessage id="UserTableDetailsCell.delete-button.label" />
        </Button>
      </div>
    </div>
  );
};

export default UserTableDetailsCell;
