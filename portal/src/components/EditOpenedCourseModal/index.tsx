import React, { useCallback, useEffect, useMemo, useState } from "react";
import { FormattedMessage } from "react-intl";
import { Button, Modal } from "semantic-ui-react";
import { useTextFieldChange } from "../../hooks/component";
import type { Error } from "../../trpc";
import { OpenedCourse, TimeSlot } from "../../types";
import InputWithErrorField from "../InputWithErrorField";

import { useTimeSlot } from "../../contexts/TimeSlotProvider";
import TimeSlotTable from "../TimeSlotTable";
import styles from "./styles.module.css";

interface EditOpenedCourseModalProps {
  loading: boolean;
  error: Error | null;
  isCreateNewOpenedCourse: boolean;
  isEditOpenedCourseModalOpen: boolean;
  currentOpenedCourse: OpenedCourse;
  onChangeSection: (value: string) => void;
  onChangeYear: (value: string) => void;
  onChangeSemester: (value: string) => void;
  onChangeTimeSlots: (value: string[]) => void;
  onChangeVenue: (value: string) => void;
  onChangeInstructor: (value: string) => void;
  onChangeCapacity: (value: string) => void;
  onSave: () => void;
  onCloseEditOpenedCourseModal: () => void;
}

const EditOpenedCourseModal: React.FC<EditOpenedCourseModalProps> = (props) => {
  const {
    loading,
    error,
    isCreateNewOpenedCourse = false,
    isEditOpenedCourseModalOpen,
    currentOpenedCourse,
    onChangeSection,
    onChangeYear,
    onChangeSemester,
    onChangeTimeSlots,
    onChangeVenue,
    onChangeInstructor,
    onChangeCapacity,
    onSave,
    onCloseEditOpenedCourseModal,
  } = props;
  const { timeSlots } = useTimeSlot();
  const [selectedTimeSlotIDs, setSelectedTimeSlotIDs] = useState<string[]>(
    currentOpenedCourse.timeSlotIds
  );

  const onSelectTimeSlot = useCallback(
    (timeSlot: TimeSlot) => () => {
      const index = currentOpenedCourse.timeSlotIds.indexOf(timeSlot.id);
      if (index !== -1) {
        setSelectedTimeSlotIDs((original) =>
          original.filter((x) => x !== timeSlot.id)
        );
      } else {
        setSelectedTimeSlotIDs((original) => [...original, timeSlot.id]);
      }
    },
    [currentOpenedCourse.timeSlotIds]
  );

  const isTimeSlotSelected = useCallback(
    (timeSlot: TimeSlot) => selectedTimeSlotIDs.includes(timeSlot.id),
    [selectedTimeSlotIDs]
  );

  useEffect(() => {
    onChangeTimeSlots(selectedTimeSlotIDs);
  }, [onChangeTimeSlots, selectedTimeSlotIDs]);

  useEffect(() => {
    setSelectedTimeSlotIDs(currentOpenedCourse.timeSlotIds);
  }, [currentOpenedCourse.timeSlotIds]);

  const onChangeSectionField = useTextFieldChange(onChangeSection);
  const onChangeYearField = useTextFieldChange(onChangeYear);
  const onChangeSemesterField = useTextFieldChange(onChangeSemester);
  const onChangeVenueField = useTextFieldChange(onChangeVenue);
  const onChangeInstructorField = useTextFieldChange(onChangeInstructor);
  const onChangeCapacityField = useTextFieldChange(onChangeCapacity);

  const commonInputFieldProps = useMemo(
    () => ({
      loading,
      focus: true,
      errorData: error,
    }),
    [error, loading]
  );

  return (
    <Modal
      size="tiny"
      open={isEditOpenedCourseModalOpen}
      onClose={onCloseEditOpenedCourseModal}
    >
      <Modal.Header>
        <FormattedMessage
          id={
            isCreateNewOpenedCourse
              ? "EditOpenedCourseModal.header.create-course"
              : "EditOpenedCourseModal.header.edit-course"
          }
          values={
            isCreateNewOpenedCourse
              ? {
                  subject: currentOpenedCourse.course.subject,
                  number: currentOpenedCourse.course.number,
                }
              : undefined
          }
        />
      </Modal.Header>
      <Modal.Content>
        <InputWithErrorField
          {...commonInputFieldProps}
          labelID="EditOpenedCourseModal.input.section.label"
          placeholderID="EditOpenedCourseModal.input.section.placeholder"
          name="section"
          value={currentOpenedCourse.section}
          onChange={onChangeSectionField}
        />
        <InputWithErrorField
          {...commonInputFieldProps}
          type="number"
          labelID="EditOpenedCourseModal.input.year.label"
          name="year"
          value={currentOpenedCourse.year}
          onChange={onChangeYearField}
        />
        <InputWithErrorField
          {...commonInputFieldProps}
          labelID="EditOpenedCourseModal.input.semester.label"
          placeholderID="EditOpenedCourseModal.input.semester.placeholder"
          name="semester"
          value={currentOpenedCourse.semester}
          onChange={onChangeSemesterField}
        />
        <TimeSlotTable
          timeSlots={timeSlots}
          onClickTimeSlot={onSelectTimeSlot}
          isTimeSlotSelected={isTimeSlotSelected}
        />
        <div className={styles.error} />
        <InputWithErrorField
          {...commonInputFieldProps}
          labelID="EditOpenedCourseModal.input.venue.label"
          placeholderID="EditOpenedCourseModal.input.venue.placeholder"
          name="venue"
          value={currentOpenedCourse.venue}
          onChange={onChangeVenueField}
        />
        <InputWithErrorField
          {...commonInputFieldProps}
          labelID="EditOpenedCourseModal.input.instructor.label"
          name="instructor"
          value={currentOpenedCourse.instructor}
          onChange={onChangeInstructorField}
        />
        <InputWithErrorField
          {...commonInputFieldProps}
          type="number"
          labelID="EditOpenedCourseModal.input.capacity.label"
          name="capacity"
          value={currentOpenedCourse.capacity}
          onChange={onChangeCapacityField}
        />
        <div className={styles.submit}>
          <Button color="green" onClick={onSave} loading={loading}>
            <FormattedMessage id="EditOpenedCourseModal.save-button.label" />
          </Button>
          <div className={styles.error}>
            {error?.message && <FormattedMessage id={error.message} />}
          </div>
        </div>
      </Modal.Content>
    </Modal>
  );
};

export default EditOpenedCourseModal;
