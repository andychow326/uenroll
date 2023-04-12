import React from "react";
import { FormattedDate } from "react-intl";
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
            <p>Enrollment Request ID:&emsp;</p>
          </div>
          <p>{requestID}</p>
        </div>
        <div className={styles.requestInfo}>
          <div className={styles.rightAlign}>
            <p>Submission Date:&emsp;</p>
          </div>
          <FormattedDate value={submissionDate} />
        </div>
      </div>
      <div className={styles.buttons}>
        <Button color="orange">Refresh</Button>
        <Button color="#DEDEDE">Cancel Request</Button>
      </div>
    </div>
  );
};

export default EnrollmentRequestInfo;
