import cn from "classnames";
import React, { useMemo } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { TIME_SLOTS_PER_DAY } from "../../constants";
import { DayOfWeek, TimeSlot } from "../../types";
import { groupBy } from "../../utils/array";

import styles from "./styles.module.css";

interface TimeSlotTableProps {
  timeSlots: TimeSlot[];
  onClickTimeSlot: (timeSlot: TimeSlot) => () => void;
  isTimeSlotSelected: (timeSlot: TimeSlot) => boolean;
}

const TimeSlotTable: React.FC<TimeSlotTableProps> = (props) => {
  const { timeSlots, onClickTimeSlot, isTimeSlotSelected } = props;
  const intl = useIntl();

  const timeSlotsByDayOfWeek = useMemo(
    () => groupBy(timeSlots, (x: TimeSlot) => x.dayOfWeek),
    [timeSlots]
  );

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        {Object.values(DayOfWeek).map((day) =>
          day in timeSlotsByDayOfWeek ? (
            <div className={styles.column}>{day.slice(0, 3)}</div>
          ) : null
        )}
      </div>
      <div className={styles.body}>
        {/* eslint-disable-next-line @typescript-eslint/no-unused-vars */}
        {Array.from({ length: TIME_SLOTS_PER_DAY }).map((_, i) => (
          <div className={styles.row}>
            {Object.values(DayOfWeek).map((day) =>
              day in timeSlotsByDayOfWeek ? (
                <div
                  className={cn(
                    styles.timeSlot,
                    isTimeSlotSelected(timeSlotsByDayOfWeek[day][i])
                      ? styles.selected
                      : undefined
                  )}
                  onClick={onClickTimeSlot(timeSlotsByDayOfWeek[day][i])}
                >
                  <FormattedMessage
                    id="TimeSlotTable.time-slot"
                    values={{
                      start: intl.formatTime(
                        timeSlotsByDayOfWeek[day][i].start,
                        { timeZone: "UTC" }
                      ),
                      end: intl.formatTime(timeSlotsByDayOfWeek[day][i].end, {
                        timeZone: "UTC",
                      }),
                    }}
                  />
                </div>
              ) : null
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TimeSlotTable;
