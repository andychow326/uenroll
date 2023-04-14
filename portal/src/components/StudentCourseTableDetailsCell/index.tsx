import React from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { useTimeSlot } from "../../contexts/TimeSlotProvider";
import { OpenedCourse, TimeSlot } from "../../types";
import styles from "./styles.module.css";

interface StudentCourseTableDetailsCellRowItemProps {
  instructor: string;
  timeSlots: TimeSlot[];
  venue: string;
  capacity: number;
  openSeats: number;
}

const StudentCourseTableDetailsCellRowItem: React.FC<
  StudentCourseTableDetailsCellRowItemProps
> = (props) => {
  const { instructor, timeSlots, venue, capacity, openSeats } = props;
  const intl = useIntl();

  return (
    <div className={styles.row} style={{ minWidth: 1000 }}>
      <div style={{ width: 150 }}>
        <p>{timeSlots[0].dayOfWeek}</p>
        <p>
          <FormattedMessage
            id="CourseTableDetailsCellRowItem.time-slot.time"
            values={{
              start: intl.formatTime(timeSlots[0].start, { timeZone: "UTC" }),
              end: intl.formatTime(timeSlots.slice(-1)[0].end, {
                timeZone: "UTC",
              }),
            }}
          />
        </p>
      </div>
      <div style={{ width: 200 }}>{venue}</div>
      <div style={{ width: 200 }}>{instructor}</div>
      <div style={{ width: 150 }} />
      <div style={{ width: 200 }}>
        <FormattedMessage
          id="CourseTableDetailsCellRowItem.seats.label"
          values={{ openSeats, capacity }}
        />
      </div>
    </div>
  );
};

interface StudentCourseTableDetailsCellProps {
  isAdmin?: boolean;
  openedCourse: OpenedCourse;
}

const StudentCourseTableDetailsCell: React.FC<
  StudentCourseTableDetailsCellProps
> = (props) => {
  const { openedCourse } = props;
  const { getTimeSlotsByIDs } = useTimeSlot();

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.header} style={{ minWidth: 1000 }}>
          <div style={{ width: 150 }}>
            <FormattedMessage id="CourseTableDetailsCell.time-slot.label" />
          </div>
          <div style={{ width: 200 }}>
            <FormattedMessage id="CourseTableDetailsCell.venue.label" />
          </div>
          <div style={{ width: 200 }}>
            <FormattedMessage id="CourseTableDetailsCell.instructor.label" />
          </div>
          <div style={{ width: 100, visibility: "hidden" }} />
          <div style={{ width: 100, visibility: "hidden" }} />
          <div style={{ width: 200 }}>
            <FormattedMessage id="CourseTableDetailsCell.seats.label" />
          </div>
        </div>
        <div className={styles.body} style={{ minWidth: 1000 }}>
          <StudentCourseTableDetailsCellRowItem
            {...openedCourse}
            timeSlots={getTimeSlotsByIDs(openedCourse.timeSlotIds)}
            openSeats={openedCourse.openSeats}
          />
        </div>
      </div>
    </div>
  );
};

export default StudentCourseTableDetailsCell;
