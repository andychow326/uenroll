import React from "react";
import { FormattedMessage } from "react-intl";
import { Button } from "semantic-ui-react";

import styles from "./styles.module.css";

interface EnrollmentRequestInfoProps {
  onRefresh: () => void;
}

const EnrollmentRequestInfo: React.FC<EnrollmentRequestInfoProps> = (props) => {
  const { onRefresh } = props;

  return (
    <div className={styles.container}>
      <div className={styles.hero}>
        <div className={styles.requestInfo}>
          <div className={styles.rightAlign}>
            <FormattedMessage id="EnrollmentStatus.request.id.label" />
          </div>
        </div>
        <div className={styles.requestInfo}>
          <div className={styles.rightAlign}>
            <FormattedMessage id="EnrollmentStatus.request.submission-date.label" />
          </div>
        </div>
      </div>
      <div className={styles.buttons}>
        <Button color="orange" onClick={onRefresh}>
          <FormattedMessage id="EnrollmentStatus.request.refresh-button.label" />
        </Button>
      </div>
    </div>
  );
};

export default EnrollmentRequestInfo;
