import React from "react";
import { FormattedDate, FormattedMessage } from "react-intl";

import { Button } from "semantic-ui-react";
import styles from "./styles.module.css";

interface OpenedCourseTableDetailsCellProps {
  id: string;
  subject: string;
  number: string;
  section: string;
  year: number;
  semester: string;
  timeSlotID: string;
  venue: string;
  lecturer: string;
  capacity: number;
  onEdit: () => void;
}

const OpenedCourseTableDetailsCell: React.FC<OpenedCourseTableDetailsCellProps> = (props) => {
  const {
    id,
    subject,
    number,
    section,
    year,
    semester,
    timeSlotID,
    venue,
    lecturer,
    capacity,
    onEdit,
  } = props;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div style={{ width: 100 }}>
          <FormattedMessage id="OpenedCourseTableDetailsCell.section.label" />
        </div>
        <div style={{ width: 100 }}>
          <FormattedMessage id="OpenedCourseTableDetailsCell.time-slot-id.label" />
        </div>
        <div style={{ width: 150 }}>
          <FormattedMessage id="OpenedCourseTableDetailsCell.venue.label" />
        </div>
        <div style={{ width: 100 }}>
          <FormattedMessage id="OpenedCourseTableDetailsCell.lecturer.label" />
        </div>
        <div style={{ width: 100 }}>
          <FormattedMessage id="OpenedCourseableDetailsCell.capacity.label" />
        </div>
      </div>
      <div className={styles.divider} />
      <div className={styles.body}>
        <div style={{ width: 100 }}>{section}</div>
        <div style={{ width: 100 }}>{timeSlotID}</div>
        <div style={{ width: 150 }}>{venue}</div>
        <div style={{ width: 100 }}>{lecturer}</div>
        <div style={{ width: 100 }}>{capacity}</div>
        <Button color="blue" onClick={onEdit}>
          <FormattedMessage id="OpenedCourseTableDetailsCell.edit-button.label" />
        </Button>
        {/* TODO: Implement delete button */}
        <Button color="red">
          <FormattedMessage id="OpenedCourseTableDetailsCell.delete-button.label" />
        </Button>
      </div>
      <div className={styles.footer}>
        <Button color="blue" onClick={onEdit}>
          <FormattedMessage id="OpenedCourseTableDetailsCell.edit-button.label" />
        </Button>
        {/* TODO: Implement delete button */}
        <Button color="red">
          <FormattedMessage id="OpenedCourseTableDetailsCell.delete-button.label" />
        </Button>
      </div>
    </div>
  );
};

export default OpenedCourseTableDetailsCell;
