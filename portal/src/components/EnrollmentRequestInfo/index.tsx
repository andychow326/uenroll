import React from "react";
import { FormattedDate, FormattedMessage } from "react-intl";
import { Button } from "semantic-ui-react";

import styles from "./styles.module.css";

interface EnrollmentRequestInfoProps {
  requestID: string;
  submissionDate: string;
}

const EnrollmentRequestInfo: React.FC<EnrollmentRequestInfoProps> = (props) => {
  const { requestID, submissionDate } = props;
  // const id = useID();

  return (
    <div className={styles.container}>
      <div className={styles.hero}>
        <div className={styles.requestInfo}>
          <div className={styles.rightAlign}>
            <FormattedMessage id="EnrollmentStatus.request.id.label" />
          </div>
          <p>{requestID}</p>
        </div>
        <div className={styles.requestInfo}>
          <div className={styles.rightAlign}>
            <FormattedMessage id="EnrollmentStatus.request.submission-date.label" />
          </div>
          <FormattedDate value={submissionDate} />
        </div>
      </div>
      <div className={styles.buttons}>
        <Button color="orange">Refresh</Button>
        <Button>Cancel Request</Button>
      </div>
    </div>
  );
};

export default EnrollmentRequestInfo;
